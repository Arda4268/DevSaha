package com.ardaesmekaya.service.impl;



import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ardaesmekaya.dto.DtoOyuncu;
import com.ardaesmekaya.dto.DtoOyuncuGolAsistRequest;
import com.ardaesmekaya.dto.DtoOyuncuGolAsistResponse;
import com.ardaesmekaya.dto.DtoOyuncuIU;
import com.ardaesmekaya.dto.DtoTakim;
import com.ardaesmekaya.model.Oyuncu;
import com.ardaesmekaya.model.Takim;
import com.ardaesmekaya.repository.OyuncuRepository;
import com.ardaesmekaya.service.IOyuncuService;

@Service
public class OyuncuServiceImpl implements IOyuncuService{
	
	@Autowired
	private OyuncuRepository oyuncuRepository;

	@Override
	public DtoOyuncu findOyuncuById(Long id) {
		DtoOyuncu dtoOyuncu = new DtoOyuncu();
		Optional<Oyuncu> optional = oyuncuRepository.findById(id);
		if (optional.isPresent()) {
			DtoTakim dtoTakım = new DtoTakim();
			Oyuncu oyuncu = optional.get();
			Takim takim = oyuncu.getTakim();
			BeanUtils.copyProperties(oyuncu,dtoOyuncu);
			BeanUtils.copyProperties(takim, dtoTakım);
			dtoOyuncu.setTakim(dtoTakım);	
		}
		return dtoOyuncu;
	}

	@Override
	public List<DtoOyuncu> getAllOyuncu() {
	    List<DtoOyuncu> dtoList = new ArrayList<>();

	    List<Oyuncu> oyuncuList = oyuncuRepository.findAll();
	    for (Oyuncu oyuncu : oyuncuList) {
	        DtoOyuncu dtoOyuncu = new DtoOyuncu();
	        BeanUtils.copyProperties(oyuncu, dtoOyuncu);

	        Takim takim = oyuncu.getTakim();
	        if (takim != null) {
	            DtoTakim dtoTakim = new DtoTakim();
	            BeanUtils.copyProperties(takim, dtoTakim);
	            dtoOyuncu.setTakim(dtoTakim);
	        } else {
	            dtoOyuncu.setTakim(null);
	        }

	        dtoList.add(dtoOyuncu);
	    }

	    return dtoList;
	}


	@Override
	public DtoOyuncu updateOyuncu(Long id, DtoOyuncuIU dtoOyuncuIU) {
		DtoOyuncu dtoOyuncu =new DtoOyuncu();
		
		Optional<Oyuncu> optional = oyuncuRepository.findById(id);
		if (optional.isPresent()) {
			Oyuncu dbOyuncu = optional.get();
		
			dbOyuncu.setFirstName(dtoOyuncuIU.getFirstName());
			dbOyuncu.setLastName(dtoOyuncuIU.getLastName());
			dbOyuncu.setSehir(dtoOyuncuIU.getSehir());
			dbOyuncu.setTelefon(dtoOyuncuIU.getTelefon());
			dbOyuncu.setYas(dtoOyuncuIU.getYas());
			dbOyuncu.setAyak(dtoOyuncuIU.getAyak());
			dbOyuncu.setPozisyon(dtoOyuncuIU.getPozisyon());
			
			DtoTakim dtoTakım = new DtoTakim();
			Takim takim = dbOyuncu.getTakim();
			
			Oyuncu updatedOyuncu = oyuncuRepository.save(dbOyuncu);
			BeanUtils.copyProperties(takim, dtoTakım);
			BeanUtils.copyProperties(updatedOyuncu, dtoOyuncu);
			dtoOyuncu.setTakim(dtoTakım);
			return dtoOyuncu;
		}
		return null;
	}

	@Override
	public DtoOyuncu getOyuncuByUsername(String username) {
	    // Oyuncuyu username ile buluyoruz
	    Oyuncu oyuncu = oyuncuRepository.findByUser_Username(username);  // Burada username ile oyuncu sorguluyoruz
	    if (oyuncu == null) {
	        throw new RuntimeException("Oyuncu bulunamadı");
	    }

	    // Oyuncu bilgilerini DTO'ya kopyalıyoruz
	    DtoOyuncu dtoOyuncu = new DtoOyuncu();
	    BeanUtils.copyProperties(oyuncu, dtoOyuncu);

	    // Takım bilgilerini alıp DTO'ya kopyalıyoruz
	    DtoTakim dtoTakim = new DtoTakim();
	    Takim takim = oyuncu.getTakim();  // Oyuncunun bağlı olduğu takımı alıyoruz
	    if (takim != null) {
	        BeanUtils.copyProperties(takim, dtoTakim);

	        // Oyuncu isimlerini alıp takım DTO'suna ekliyoruz
	        List<String> oyuncularUsernames = new ArrayList<>();
	        for (Oyuncu takimOyuncu : takim.getOyuncular()) {
	            oyuncularUsernames.add(takimOyuncu.getUser().getUsername());
	        }
	        dtoTakim.setOyuncuUsernames(oyuncularUsernames);
	    }

	    // Takım bilgilerini oyuncu DTO'suna setliyoruz
	    dtoOyuncu.setTakim(dtoTakim);

	    return dtoOyuncu;  // Oyuncu ve takım bilgilerini döndürüyoruz
    }

	@Override
	public List<DtoOyuncu> getSiraliOyuncular() {
		   List<Oyuncu> oyuncular = oyuncuRepository.findAll();

		    // Gol + asist toplamına göre sıralama
		    oyuncular.sort((o1, o2) -> {
		        int toplam1 = parseIntSafe(o1.getGol()) + parseIntSafe(o1.getAsist());
		        int toplam2 = parseIntSafe(o2.getGol()) + parseIntSafe(o2.getAsist());
		        return Integer.compare(toplam2, toplam1); // büyükten küçüğe
		    });

		    // DTO listesi
		    List<DtoOyuncu> dtoList = new ArrayList<>();

		    for (Oyuncu o : oyuncular) {
		        DtoOyuncu dto = new DtoOyuncu();
		        dto.setId(o.getId());
		        dto.setFirstName(o.getFirstName());
		        dto.setLastName(o.getLastName());
		        dto.setYas(o.getYas());
		        dto.setSehir(o.getSehir());
		        dto.setTelefon(o.getTelefon());
		        dto.setPozisyon(o.getPozisyon());
		        dto.setAyak(o.getAyak());
		        dto.setGol(o.getGol());
		        dto.setAsist(o.getAsist());
		        dto.setGalibiyet(o.getGalibiyet());
		        dto.setMaglubiyet(o.getMaglubiyet());

		        if (o.getTakim() != null) {
		            DtoTakim dtoTakim = new DtoTakim();
		            dtoTakim.setId(o.getTakim().getId());
		            dtoTakim.setName(o.getTakim().getName());
		            dtoTakim.setSehir(o.getTakim().getSehir());
		            dto.setTakim(dtoTakim);
		        }

		        dtoList.add(dto);
		    }

		    return dtoList;
	}
	
	private int parseIntSafe(String sayiStr) {
	    try {
	        return Integer.parseInt(sayiStr);
	    } catch (NumberFormatException e) {
	        return 0; // Boşsa ya da sayı değilse 0 kabul et
	    }
	}

	@Override
	public DtoOyuncuGolAsistResponse updateGolAsist(String username, DtoOyuncuGolAsistRequest request) {
        // 1. Oyuncuyu username ile bul
        Oyuncu oyuncu = oyuncuRepository.findByUser_Username(username);
        if (oyuncu == null) {
            throw new RuntimeException("Oyuncu bulunamadı: " + username);
        }

        // 2. Mevcut gol ve asisti int’e çevir
        int mevcutGol   = parseIntSafe(oyuncu.getGol());
        int mevcutAsist = parseIntSafe(oyuncu.getAsist());

        // 3. Yeni gol/asist değerlerini ekle
        int toplamGol   = mevcutGol + request.getGol();
        int toplamAsist = mevcutAsist + request.getAsist();

        // 4. Entity’ye geri set et (String olarak)
        oyuncu.setGol(String.valueOf(toplamGol));
        oyuncu.setAsist(String.valueOf(toplamAsist));

        // 5. Kaydet
        Oyuncu updated = oyuncuRepository.save(oyuncu);

        // 6. Response DTO’sunu doldur ve döndür
        DtoOyuncuGolAsistResponse resp = new DtoOyuncuGolAsistResponse();
        resp.setId(updated.getId());
        resp.setUsername(username);
        resp.setGol(updated.getGol());
        resp.setAsist(updated.getAsist());
        return resp;
	}

	}

	


