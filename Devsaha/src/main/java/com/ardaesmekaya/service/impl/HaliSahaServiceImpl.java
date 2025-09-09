package com.ardaesmekaya.service.impl;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;


import com.ardaesmekaya.dto.DtoHaliSaha;
import com.ardaesmekaya.dto.DtoOyuncu;
import com.ardaesmekaya.dto.DtoSaha;
import com.ardaesmekaya.model.HaliSaha;
import com.ardaesmekaya.model.Oyuncu;
import com.ardaesmekaya.model.Saha;
import com.ardaesmekaya.model.User;
import com.ardaesmekaya.repository.HaliSahaRepository;
import com.ardaesmekaya.repository.SahaRepository;
import com.ardaesmekaya.repository.UserRepository;
import com.ardaesmekaya.service.IHaliSahaService;

@Service
public class HaliSahaServiceImpl implements IHaliSahaService{
	
	@Autowired
	private HaliSahaRepository haliSahaRepository;
	
	@Autowired
	private SahaRepository sahaRepository;
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public DtoHaliSaha getHaliSahaByUsername(String username) {
	    // Kullanıcıyı buluyoruz
	    User user = userRepository.findByUsername(username)
	            .orElseThrow(() -> new RuntimeException("User not found"));

	    // Kullanıcıya bağlı HaliSaha'yı alıyoruz
	    HaliSaha haliSaha = user.getHalisaha();

	    // Eğer HaliSaha bulunmazsa hata fırlatıyoruz
	    if (haliSaha == null) {
	        throw new RuntimeException("HaliSaha not found for user: " + username);
	    }

	    // Saha'yi alıyoruz
	    Saha saha = haliSaha.getSaha();

	    // DtoSaha'yı oluşturuyoruz
	    DtoSaha dtoSaha = null;
	    if (saha != null) {
	        dtoSaha = new DtoSaha();
	        dtoSaha.setId(saha.getId());
	        dtoSaha.setName(saha.getName());
	        dtoSaha.setDurum(saha.getDurum().toString());
	        dtoSaha.setHaliSahaUsername(username);
	    }

	    // DtoHaliSaha'yı dolduruyoruz
	    DtoHaliSaha dtoHaliSaha = new DtoHaliSaha();
	    dtoHaliSaha.setId(haliSaha.getId());
	    dtoHaliSaha.setName(haliSaha.getName());
	    dtoHaliSaha.setAdres(haliSaha.getAdres());
	    dtoHaliSaha.setHtelefon(haliSaha.getHtelefon());
	    dtoHaliSaha.setFiyat(haliSaha.getFiyat());
	    dtoHaliSaha.setSaha(dtoSaha);  // Tek saha döndürülüyor

	    return dtoHaliSaha;
	}

	@Override
	public List<DtoHaliSaha> getAllHaliSaha() {
		List<DtoHaliSaha> dtoList = new ArrayList<>();
		
		List<HaliSaha> haliSahalist = haliSahaRepository.findAll();
		for (HaliSaha haliSaha : haliSahalist) {
			DtoHaliSaha dtoHaliSaha = new DtoHaliSaha();
			BeanUtils.copyProperties(haliSaha,dtoHaliSaha);
			
			Saha saha = haliSaha.getSaha();
			if (saha != null) {
				DtoSaha dtoSaha = new DtoSaha();
				BeanUtils.copyProperties(saha, dtoSaha);
				dtoHaliSaha.setSaha(dtoSaha);
			}else {
				dtoHaliSaha.setSaha(null);
			}
			dtoList.add(dtoHaliSaha);
		}
		return dtoList;
	}


	
	
	
	
	}
	

	


