package com.ardaesmekaya.jwt;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ardaesmekaya.exception.BaseException;
import com.ardaesmekaya.exception.ErrorMessage;
import com.ardaesmekaya.exception.MessageType;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter{
	
	@Autowired
	private JWTService jwtService;
	
	@Autowired
	private UserDetailsService userDetailsService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		 
		// Bearer .......
		String header;
		String token;
		String username;
		
		header = request.getHeader("Authorization");
		
		if (header == null) {
			filterChain.doFilter(request, response);
			return;
		}
		
		token = header.substring(7);
		try {
			username = jwtService.getUsernameByToken(token);
			if (username!=null && SecurityContextHolder.getContext().getAuthentication()==null) {
				UserDetails userDetails = userDetailsService.loadUserByUsername(username);
				if (userDetails!=null && jwtService.isTokenValid(token)) {
					
					UsernamePasswordAuthenticationToken authentication =
				new UsernamePasswordAuthenticationToken(username, null ,userDetails.getAuthorities());
					
					authentication.setDetails(userDetails);
					
					SecurityContextHolder.getContext().setAuthentication(authentication);
				} 
			} 
		} catch (ExpiredJwtException e) { // Token Süre bitmiştir yada kullanılamıyor
			  throw new BaseException(new ErrorMessage(MessageType.TOKEN_IS_EXPIRED, e.getMessage()));
		}
		catch (Exception e) {
			throw new BaseException(new ErrorMessage(MessageType.GENERAL_EXCEPTİON, e.getMessage()));
		}
		filterChain.doFilter(request, response);

	}
	

}
