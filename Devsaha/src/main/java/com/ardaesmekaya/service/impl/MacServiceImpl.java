package com.ardaesmekaya.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ardaesmekaya.dto.MacListDto;
import com.ardaesmekaya.dto.MacUpdateDto;
import com.ardaesmekaya.model.Mac;
import com.ardaesmekaya.model.Takim;
import com.ardaesmekaya.repository.MacRepository;
import com.ardaesmekaya.repository.TakimRepository;
import com.ardaesmekaya.service.IMacService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class MacServiceImpl implements IMacService{
	
	@Autowired
	private MacRepository macRepository;

	@Autowired
	private TakimRepository takimRepository;
	
	@Transactional
	@Override
	public Mac updateMatchStats(MacUpdateDto dto) {
		// 1) Maçı al
        Mac mac = macRepository.findById(dto.getMatchId())
            .orElseThrow(() -> new EntityNotFoundException("Maç bulunamadı: " + dto.getMatchId()));

        // 2) Mac skorlarını set et
        mac.setTakim1Skor(dto.getTakim1Skor());
        mac.setTakim2Skor(dto.getTakim2Skor());

        // 3) Takımları al
        Takim t1 = mac.getTakim1();
        Takim t2 = mac.getTakim2();

        // 4) Takım 1 istatistik güncellemesi
        int oyn1     = parseIntSafe(t1.getOynananMaç()) + 1;
        int atilan1  = parseIntSafe(t1.getAtilanGol()) + dto.getTakim1Skor();
        int yenilen1 = parseIntSafe(t1.getYenilenGol()) + dto.getTakim2Skor();
        t1.setOynananMaç(String.valueOf(oyn1));
        t1.setAtilanGol(String.valueOf(atilan1));
        t1.setYenilenGol(String.valueOf(yenilen1));

        // 5) Takım 2 istatistik güncellemesi
        int oyn2     = parseIntSafe(t2.getOynananMaç()) + 1;
        int atilan2  = parseIntSafe(t2.getAtilanGol()) + dto.getTakim2Skor();
        int yenilen2 = parseIntSafe(t2.getYenilenGol()) + dto.getTakim1Skor();
        t2.setOynananMaç(String.valueOf(oyn2));
        t2.setAtilanGol(String.valueOf(atilan2));
        t2.setYenilenGol(String.valueOf(yenilen2));

        // 6) Galibiyet / Mağlubiyet güncellemesi
        if (dto.getTakim1Skor() > dto.getTakim2Skor()) {
            t1.setGalibiyet(String.valueOf(parseIntSafe(t1.getGalibiyet()) + 1));
            t2.setMaglubiyet(String.valueOf(parseIntSafe(t2.getMaglubiyet()) + 1));
        } else if (dto.getTakim2Skor() > dto.getTakim1Skor()) {
            t2.setGalibiyet(String.valueOf(parseIntSafe(t2.getGalibiyet()) + 1));
            t1.setMaglubiyet(String.valueOf(parseIntSafe(t1.getMaglubiyet()) + 1));
        }
        // (Beraberlik senaryosu eklemek isterseniz buraya ekleyebilirsiniz)

        // 7) Kaydet
        takimRepository.save(t1);
        takimRepository.save(t2);
        return macRepository.save(mac);
	}
	
	 private int parseIntSafe(String value) {
	        try {
	            return Integer.parseInt(value);
	        } catch (Exception e) {
	            return 0;
	        }
	    }

	 
	@Override
	public List<MacListDto> getAllMatches() {
		return macRepository.findAll()
	            .stream()
	            .map(mac -> new MacListDto(
	                mac.getId(),
	                mac.getTakim1().getName(),
	                mac.getTakim1Skor(),
	                mac.getTakim2().getName(),
	                mac.getTakim2Skor(),
	                mac.getRandevu() != null ? mac.getRandevu().getId() : null
	            ))
	            .collect(Collectors.toList());
	    }
	}


