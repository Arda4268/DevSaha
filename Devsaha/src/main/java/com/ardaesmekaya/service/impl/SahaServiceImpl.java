package com.ardaesmekaya.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ardaesmekaya.dto.DtoSaha;
import com.ardaesmekaya.dto.DtoSahaUI;
import com.ardaesmekaya.enums.SahaDurum;
import com.ardaesmekaya.model.HaliSaha;
import com.ardaesmekaya.model.Oyuncu;
import com.ardaesmekaya.model.Saha;
import com.ardaesmekaya.repository.HaliSahaRepository;
import com.ardaesmekaya.repository.SahaRepository;
import com.ardaesmekaya.service.ISahaService;

@Service
public class SahaServiceImpl implements ISahaService {
	
	@Autowired
    private SahaRepository sahaRepository;
	
	@Autowired
    private HaliSahaRepository haliSahaRepository;

	@Override
	public DtoSaha createSaha(DtoSahaUI dto) {
		
		HaliSaha haliSaha = haliSahaRepository.findByUser_Username(dto.getHaliSahaUsername());  // Burada username ile oyuncu sorguluyoruz
	    if (haliSaha == null) {
	        throw new RuntimeException("Oyuncu bulunamadı");
	    }
		
		// Yeni bir Saha oluştur
        Saha saha = new Saha();
        saha.setName(dto.getName());
        saha.setDurum(SahaDurum.BOŞ);  // Durumu aktif olarak belirliyoruz, ihtiyaç varsa enum ile değiştirilebilir
        saha.setHaliSaha(haliSaha); // HaliSaha objesini değil, HaliSaha'nın ID'sini atayacağız

        // Saha'yı veritabanına kaydet
        saha = sahaRepository.save(saha);

        // DtoSaha döndür
        DtoSaha dtoSaha = new DtoSaha();
        dtoSaha.setName(saha.getName());
        dtoSaha.setHaliSahaUsername(haliSaha.getUser().getUsername());
        dtoSaha.setDurum(saha.getDurum().name());  // Durumu string olarak döndürüyoruz

        return dtoSaha;
	}
	
	
	

}
