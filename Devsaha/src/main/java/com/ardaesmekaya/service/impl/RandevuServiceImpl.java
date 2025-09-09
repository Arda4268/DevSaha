package com.ardaesmekaya.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ardaesmekaya.dto.DtoRandevu;
import com.ardaesmekaya.dto.DtoRandevuDurumGuncelle;
import com.ardaesmekaya.dto.DtoRandevuUI;
import com.ardaesmekaya.enums.RandevuDurum;
import com.ardaesmekaya.model.HaliSaha;
import com.ardaesmekaya.model.Mac;
import com.ardaesmekaya.model.Randevu;
import com.ardaesmekaya.model.Saha;
import com.ardaesmekaya.model.Takim;
import com.ardaesmekaya.repository.HaliSahaRepository;
import com.ardaesmekaya.repository.MacRepository;
import com.ardaesmekaya.repository.RandevuRepository;
import com.ardaesmekaya.repository.SahaRepository;
import com.ardaesmekaya.repository.TakimRepository;
import com.ardaesmekaya.service.IRandevuService;

@Service
public class RandevuServiceImpl  implements IRandevuService{
	
	@Autowired 
	private RandevuRepository randevuRepository;
    
	@Autowired
    private MacRepository macRepository;
    
    @Autowired 
    private HaliSahaRepository haliSahaRepository;
    
    @Autowired 
    private SahaRepository sahaRepository;
    
    @Autowired 
    private TakimRepository takimRepository;

	@Override
	public DtoRandevu createRandevu(DtoRandevuUI dto) {
		Randevu randevu = new Randevu();

        HaliSaha haliSaha = haliSahaRepository.findById(dto.getHalisahaId())
                .orElseThrow(() -> new RuntimeException("Hali saha bulunamadı"));
        Saha saha = sahaRepository.findById(dto.getSahaId())
                .orElseThrow(() -> new RuntimeException("Saha bulunamadı"));
        Takim takim1 = takimRepository.findById(dto.getTakim1Id())
                .orElseThrow(() -> new RuntimeException("Takım1 bulunamadı"));
        Takim takim2 = takimRepository.findById(dto.getTakim2Id())
                .orElseThrow(() -> new RuntimeException("Takım2 bulunamadı"));

        randevu.setTarih(dto.getTarih());
        randevu.setDurum(RandevuDurum.PLANLANDI);
        randevu.setHaliSaha(haliSaha);
        randevu.setSaha(saha);
        randevu.setTakim1(takim1);
        randevu.setTakim2(takim2);

        Randevu savedRandevu = randevuRepository.save(randevu);

        // Mac oluştur
        Mac mac = new Mac();
        mac.setTarih(dto.getTarih());
        mac.setTakim1(takim1);
        mac.setTakim2(takim2);
        mac.setTakim1Skor(0);
        mac.setTakim2Skor(0);
        mac.setRandevu(savedRandevu);

        macRepository.save(mac);

        savedRandevu.setMac(mac);
        randevuRepository.save(savedRandevu);

        // DTO dön
        DtoRandevu response = new DtoRandevu();
        response.setId(savedRandevu.getId());
        response.setTarih(savedRandevu.getTarih());
        response.setDurum(savedRandevu.getDurum());
        response.setHalisahaUsername(haliSaha.getUser().getUsername());
        response.setTakim1(takim1.getName());
        response.setTakim2(takim2.getName());

        return response;
    }

	@Override
	public DtoRandevu updateRandevuDurum(Long randevuId, DtoRandevuDurumGuncelle dto) {
		Randevu randevu = randevuRepository.findById(randevuId)
	            .orElseThrow(() -> new RuntimeException("Randevu bulunamadı"));

	    randevu.setDurum(dto.getDurum());
	    Randevu updated = randevuRepository.save(randevu);

	    DtoRandevu response = new DtoRandevu();
	    response.setId(updated.getId());
	    response.setTarih(updated.getTarih());
	    response.setDurum(updated.getDurum());
	    response.setHalisahaUsername(updated.getHaliSaha().getUser().getUsername());
	    response.setTakim1(updated.getTakim1().getName());
	    response.setTakim2(updated.getTakim2().getName());

	    return response;
	}

	@Override
	public List<DtoRandevu> getRandevularByDurum(DtoRandevuDurumGuncelle dto) {
		 List<Randevu> randevular = randevuRepository.findByDurum(dto.getDurum());

		    return randevular.stream().map(r -> {
		        DtoRandevu dtoRandevu = new DtoRandevu();
		        dtoRandevu.setId(r.getId());
		        dtoRandevu.setTarih(r.getTarih());
		        dtoRandevu.setDurum(r.getDurum());
		        dtoRandevu.setHalisahaUsername(r.getHaliSaha().getUser().getUsername());
		        dtoRandevu.setTakim1(r.getTakim1().getName());
		        dtoRandevu.setTakim2(r.getTakim2().getName());
		        return dtoRandevu;
		    }).collect(Collectors.toList());
	}

	@Override
	public DtoRandevu getRandevuById(Long id) {
		Randevu randevu = randevuRepository.findById(id)
		        .orElseThrow(() -> new RuntimeException("Randevu bulunamadı: ID = " + id));

		    DtoRandevu dto = new DtoRandevu();
		    dto.setId(randevu.getId());
		    dto.setTarih(randevu.getTarih());
		    dto.setDurum(randevu.getDurum());
		    dto.setHalisahaUsername(randevu.getHaliSaha().getUser().getUsername());
		    dto.setTakim1(randevu.getTakim1().getName());
		    dto.setTakim2(randevu.getTakim2().getName());
		    dto.setMacId(randevu.getMac().getId());

		    return dto;
	}
	
	
}
	

