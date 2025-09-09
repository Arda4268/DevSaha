package com.ardaesmekaya.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ardaesmekaya.dto.IstatistikDto;
import com.ardaesmekaya.model.Macİstatistik;
import com.ardaesmekaya.model.Oyuncu;
import com.ardaesmekaya.repository.MacIstatistikRepository;
import com.ardaesmekaya.repository.OyuncuRepository;
import com.ardaesmekaya.service.IMacIstastistikService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class MacIstatistikServiceImpl implements IMacIstastistikService {
	
	@Autowired
	private MacIstatistikRepository macIstatistikRepository;
	
	@Autowired
	private OyuncuRepository oyuncuRepository;

	
	@Override
	public IstatistikDto ekleVeGetir(Long oyuncuId, Long macId, int gol, int asist) {
		// 1) Oyuncuyu yükle
        Oyuncu oyuncu = oyuncuRepository.findById(oyuncuId)
            .orElseThrow(() -> new IllegalArgumentException("Oyuncu bulunamadı: " + oyuncuId));

        // 2) Maç istatistik kaydını al veya yeni yarat
        Macİstatistik ist = macIstatistikRepository
            .findByOyuncuIdAndMacId(oyuncuId, macId)
            .orElseGet(() -> {
                Macİstatistik m = new Macİstatistik();
                m.setOyuncu(oyuncu);
                // eğer Mac objesini çekmek istersen buraya MacRepository ekleyebilirsin
                m.setMac(null);
                m.setGol("0");
                m.setAsist("0");
                return m;
            });

        // 3) String → int çevir, ekle, tekrar String’e çevir
        int oncekiGol   = parseSafe(ist.getGol());
        int toplamGol   = oncekiGol + gol;
        ist.setGol(String.valueOf(toplamGol));

        int oncekiAsist = parseSafe(ist.getAsist());
        int toplamAsist = oncekiAsist + asist;
        ist.setAsist(String.valueOf(toplamAsist));

        // 4) Oyuncunun genel toplamına da ekle
        int oyuncuOncekiGol   = parseSafe(oyuncu.getGol());
        int oyuncuOncekiAsist = parseSafe(oyuncu.getAsist());

        oyuncu.setGol(String.valueOf(oyuncuOncekiGol + gol));
        oyuncu.setAsist(String.valueOf(oyuncuOncekiAsist + asist));

        // 5) Kaydet
        macIstatistikRepository.save(ist);
        oyuncuRepository.save(oyuncu);

        // 6) Güncel değerleri DTO ile dön
        return new IstatistikDto(oyuncuId, macId, toplamGol, toplamAsist);
	}
	
	private int parseSafe(String s) {
        try {
            return Integer.parseInt(s);
        } catch (Exception e) {
            return 0;
        }
    }
	
	

}
