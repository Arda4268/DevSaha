package com.ardaesmekaya.service.impl;



import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ardaesmekaya.dto.AuthRequest;
import com.ardaesmekaya.dto.AuthRequestt;
import com.ardaesmekaya.dto.AuthResponse;
import com.ardaesmekaya.dto.DtoUser;
import com.ardaesmekaya.dto.RefreshTokenRequest;
import com.ardaesmekaya.enums.Role;
import com.ardaesmekaya.exception.BaseException;
import com.ardaesmekaya.exception.ErrorMessage;
import com.ardaesmekaya.exception.MessageType;
import com.ardaesmekaya.jwt.JWTService;
import com.ardaesmekaya.model.HaliSaha;
import com.ardaesmekaya.model.Oyuncu;
import com.ardaesmekaya.model.RefreshToken;
import com.ardaesmekaya.model.User;
import com.ardaesmekaya.repository.HaliSahaRepository;
import com.ardaesmekaya.repository.OyuncuRepository;
import com.ardaesmekaya.repository.RefreshTokenRepository;
import com.ardaesmekaya.repository.UserRepository;
import com.ardaesmekaya.service.IAuthenticationService;

import jakarta.transaction.Transactional;


@Service
public class AuthenticationServiceImpl implements IAuthenticationService{
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private OyuncuRepository oyuncuRepository;
	
	@Autowired
	private HaliSahaRepository haliSahaRepository;
	
	@Autowired
	private AuthenticationProvider authenticationProvider;
	
	@Autowired
	private JWTService jwtService;
	
	@Autowired
	private RefreshTokenRepository refreshTokenRepository;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Transactional
	public DtoUser register(AuthRequest request) {

	    if (userRepository.existsByUsername(request.getUsername())) {
	        throw new RuntimeException("Bu kullanıcı adı zaten alınmış.");
	    }

	    // String'ten enum'a dönüştürme
	    Role roleEnum;
	    try {
	        roleEnum = Role.valueOf(request.getRole().toUpperCase());
	    } catch (IllegalArgumentException e) {
	        throw new RuntimeException("Geçersiz rol girdiniz. Sadece 'OYUNCU' veya 'YETKILI' olabilir.");
	    }

	    // User nesnesi oluşturma
	    User user = new User();
	    user.setUsername(request.getUsername());
	    user.setPassword(passwordEncoder.encode(request.getPassword()));
	    user.setRole(roleEnum);

	    User savedUser = userRepository.save(user);

	    // Rol oyuncuysa oyuncu oluştur
	    if (roleEnum == Role.OYUNCU) {
	        Oyuncu oyuncu = new Oyuncu();
	        oyuncu.setFirstName(request.getFirstName());
	        oyuncu.setLastName(request.getLastName());
	        oyuncu.setYas(request.getYas());
	        oyuncu.setSehir(request.getSehir());
	        oyuncu.setTelefon(request.getTelefon());
	        oyuncu.setPozisyon(request.getPozisyon());
	        oyuncu.setAyak(request.getAyak());
	        oyuncu.setUser(savedUser);
	        oyuncuRepository.save(oyuncu);
	    }

	    // Rol yetkiliyse halı saha oluştur
	    if (roleEnum == Role.YETKİLİ) {
	        HaliSaha halisaha = new HaliSaha();
	        halisaha.setName(request.getName());
	        halisaha.setAdres(request.getAdres());
	        halisaha.setHtelefon(request.getHtelefon());
	        halisaha.setFiyat(request.getFiyat());
	        halisaha.setUser(savedUser);
	        haliSahaRepository.save(halisaha);
	    }
	    
	  
	    
	    
	    DtoUser dtoUser = new DtoUser();
	    BeanUtils.copyProperties(savedUser, dtoUser);
	    dtoUser.setFirstName(request.getFirstName());
	    dtoUser.setLastName(request.getLastName());
	    return dtoUser;
	    }
	
	private RefreshToken createRefreshToken(User user) {
		RefreshToken refreshToken = new RefreshToken();
		refreshToken.setExpireDate(new Date(System.currentTimeMillis() + 1000*60*60*4));
		refreshToken.setRefreshToken(UUID.randomUUID().toString());
		refreshToken.setUser(user);
		return refreshToken;
	}
	
	

	@Override
	public AuthResponse authenticate(AuthRequestt requestt) {
		
		try {
			UsernamePasswordAuthenticationToken authenticationToken =
			new UsernamePasswordAuthenticationToken(requestt.getUsername(), requestt.getPassword());
			authenticationProvider.authenticate(authenticationToken);
			
			Optional<User> optUser = userRepository.findByUsername(requestt.getUsername());
			
			String accessToken = jwtService.generateToken(optUser.get());
			RefreshToken savedRefreshToken = refreshTokenRepository.save(createRefreshToken(optUser.get()));
			String role = optUser.get().getRole().name();
			
			return new AuthResponse(accessToken , savedRefreshToken.getRefreshToken() ,role);
		} catch (Exception e) {
			e.printStackTrace();
			throw new BaseException(new ErrorMessage
					(MessageType.USERNAME_OR_PASSWORD_INVALID, e.getMessage()));
		}
		
	}
	
	public boolean isValidRefreshToken(Date expireDate) {
	    return new Date().before(expireDate);
	}

	@Override
	public AuthResponse refreshToken(RefreshTokenRequest input) {
		
		
		Optional<RefreshToken> optRefreshToken = refreshTokenRepository.findByRefreshToken(input.getRefreshToken());
		if (optRefreshToken.isEmpty()) {
			throw new BaseException(new ErrorMessage(MessageType.REFRESH_TOKEN_NOT_FOUND,input.getRefreshToken() ));
		}
		
		if (!isValidRefreshToken(optRefreshToken.get().getExpireDate())) {
			throw new BaseException(new ErrorMessage(MessageType.REFRESH_TOKEN_İS_EXPİRED,input.getRefreshToken() ));
		}
		User user = optRefreshToken.get().getUser();
		String accessToken = jwtService.generateToken(user);
		RefreshToken savedRefreshToken = refreshTokenRepository.save(createRefreshToken(user));
		
		
		
		return new AuthResponse(accessToken, savedRefreshToken.getRefreshToken(),null);
	}

	

		
	
}	

