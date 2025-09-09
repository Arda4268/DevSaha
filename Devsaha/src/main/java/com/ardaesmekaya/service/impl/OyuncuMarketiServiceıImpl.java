package com.ardaesmekaya.service.impl;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ardaesmekaya.dto.OyuncuDto;
import com.ardaesmekaya.dto.OyuncuMarketiCreateDto;
import com.ardaesmekaya.dto.OyuncuMarketiDto;
import com.ardaesmekaya.enums.OyuncuMarketDurum;
import com.ardaesmekaya.model.Oyuncu;
import com.ardaesmekaya.model.OyuncuMarketi;
import com.ardaesmekaya.repository.OyuncuMarketiRepository;
import com.ardaesmekaya.repository.OyuncuRepository;
import com.ardaesmekaya.service.IOyuncuMarketiService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class OyuncuMarketiServiceıImpl  implements IOyuncuMarketiService{
	
	@Autowired
	private OyuncuRepository oyuncuRepo;
	
	@Autowired
    private OyuncuMarketiRepository marketRepo;
	
	@Override
	public OyuncuMarketiDto mapToDto(OyuncuMarketi m) {
	       // oyuncu bilgilerini DTO’ya geçiriyoruz
        Oyuncu e = m.getOyuncu();
        OyuncuDto odto = new OyuncuDto(
            e.getFirstName(),
            e.getLastName(),
            e.getYas(),
            e.getSehir(),
            e.getTelefon(),
            e.getPozisyon(),
            e.getAyak(),
            e.getGol(),
            e.getAsist(),
            e.getGalibiyet(),
            e.getMaglubiyet()
        );

        OyuncuMarketiDto dto = new OyuncuMarketiDto();
        dto.setId(m.getId());
        dto.setOyuncu(odto);
        dto.setTarih(m.getTarih());
        dto.setAciklama(m.getAcıklama());
        dto.setFiyat(m.getFiyat());
        dto.setDurum(m.getDurum());
        return dto;
    }

	@Override
	public OyuncuMarketiDto createMarketItem(OyuncuMarketiCreateDto dto) {
		  // 1. Oyuncuyu bul
        Oyuncu oyuncu = oyuncuRepo.findById(dto.getOyuncuId())
            .orElseThrow(() -> new EntityNotFoundException("Oyuncu bulunamadı: " + dto.getOyuncuId()));

        // 2. Entity’yi doldur
        OyuncuMarketi marketItem = new OyuncuMarketi();
        marketItem.setOyuncu(oyuncu);
        marketItem.setTarih(LocalDateTime.now());
        marketItem.setAcıklama(dto.getAciklama());
        marketItem.setFiyat(dto.getFiyat());
        marketItem.setDurum(OyuncuMarketDurum.KIRALANABİLİR);

        // 3. Kaydet
        OyuncuMarketi saved = marketRepo.save(marketItem);

        // 4. DTO’ya dönüştür ve döndür
        return mapToDto(saved);
        
        
	}

	

}
