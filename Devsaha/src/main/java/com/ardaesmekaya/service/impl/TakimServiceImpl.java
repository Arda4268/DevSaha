package com.ardaesmekaya.service.impl;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ardaesmekaya.dto.CreateDtoTakim;
import com.ardaesmekaya.dto.DtoOyuncu;
import com.ardaesmekaya.dto.DtoTakim;
import com.ardaesmekaya.dto.UpdateDtoTakim;
import com.ardaesmekaya.model.Oyuncu;
import com.ardaesmekaya.model.Takim;
import com.ardaesmekaya.repository.OyuncuRepository;
import com.ardaesmekaya.repository.TakimRepository;

import com.ardaesmekaya.service.ITakimService;

import jakarta.persistence.EntityNotFoundException;


@Service
public class TakimServiceImpl implements ITakimService {

	@Autowired
	private OyuncuRepository oyuncuRepository;
	
	@Autowired
	private TakimRepository takimRepository;

	@Override
	public DtoTakim createTakim(CreateDtoTakim dto) {
		
		if (takimRepository.existsByName(dto.getName())) {
	        throw new RuntimeException("Bu Takım adı zaten alınmış.");
	    }
		// Oyuncuları username ile bul
	    List<Oyuncu> oyuncular = oyuncuRepository.findByUser_UsernameIn(dto.getOyuncuUsernames());

	    // Takım oluştur
	    Takim takim = new Takim();
	    takim.setName(dto.getName());
	    takim.setSehir(dto.getSehir());
	    takim.setOynananMaç("0");
	    takim.setAtilanGol("0");
	    takim.setYenilenGol("0");
	    takim.setGalibiyet("0");
	    takim.setMaglubiyet("0");
	    takim.setOyuncular(oyuncular);
	    System.out.println("DTO Name: " + dto.getName());
	    System.out.println("DTO Sehir: " + dto.getSehir());
	    System.out.println("DTO Oyuncular: " + dto.getOyuncuUsernames());


	    // Takım kaydediyoruz
	    Takim savedTakim = takimRepository.save(takim);

	    // Oyunculara takım ata
	    for (Oyuncu oyuncu : oyuncular) {
	        oyuncu.setTakim(savedTakim);
	    }
	    oyuncuRepository.saveAll(oyuncular);

	    // Dto'ya çevir
	    DtoTakim dtoTakim = new DtoTakim();
	    dtoTakim.setId(savedTakim.getId());
	    dtoTakim.setName(savedTakim.getName());
	    dtoTakim.setSehir(savedTakim.getSehir());

	    // Oyuncuların username listesini al
	    List<String> usernames = oyuncular.stream()
	            .map(oyuncu -> oyuncu.getUser().getUsername())
	            .toList();

	    dtoTakim.setOyuncuUsernames(usernames);

	    return dtoTakim;
	    }

	@Override
	public DtoTakim updateTakim(Long id, UpdateDtoTakim dto) {
		
		Optional<Takim> takimOpt = takimRepository.findById(id);
	    if (!takimOpt.isPresent()) {
	        return null;
	    }

	    Takim takim = takimOpt.get();

	    List<Oyuncu> yeniOyuncular = oyuncuRepository.findByUser_UsernameIn(dto.getOyuncuUsernames());

	    // Her oyuncuya bu takımı ata
	    for (Oyuncu oyuncu : yeniOyuncular) {
	        oyuncu.setTakim(takim);
	    }

	    // Oyuncuları kaydet
	    oyuncuRepository.saveAll(yeniOyuncular);

	    // Mevcut listeye ekle
	    List<Oyuncu> mevcutOyuncular = takim.getOyuncular();
	    mevcutOyuncular.addAll(yeniOyuncular);
	    takim.setOyuncular(mevcutOyuncular);

	    // Takımı güncelle
	    Takim updatedTakim = takimRepository.save(takim);

	    // Dto'ya dönüştür
	    DtoTakim dtoTakim = new DtoTakim();
	    dtoTakim.setId(updatedTakim.getId());
	    dtoTakim.setName(updatedTakim.getName());
	    dtoTakim.setSehir(updatedTakim.getSehir());

	    List<String> usernames = updatedTakim.getOyuncular().stream()
	        .map(oyuncu -> oyuncu.getUser().getUsername())
	        .toList();

	    dtoTakim.setOyuncuUsernames(usernames);

	    return dtoTakim;
		
	}

	@Override
	public void deleteTakim(Long id) {
		Optional<Takim> optionalTakim = takimRepository.findById(id);

	    if (optionalTakim.isPresent()) {
	        Takim takim = optionalTakim.get();

	        // Takımdaki oyuncuların takım bağlantısını kopar
	        List<Oyuncu> oyuncular = takim.getOyuncular();
	        for (Oyuncu oyuncu : oyuncular) {
	            oyuncu.setTakim(null);
	        }
	        oyuncuRepository.saveAll(oyuncular);

	        // Takımı sil
	        takimRepository.delete(takim);
	    } else {
	        throw new RuntimeException("Takım bulunamadı!");
	    }
		
	}

	@Override
	public List<DtoTakim> getAllTakim() {
		List<DtoTakim> takimListesi = new ArrayList<>();

	    List<Takim> takimlar = takimRepository.findAll();
	    for (Takim takim : takimlar) {
	        DtoTakim dtoTakim = new DtoTakim();
	        BeanUtils.copyProperties(takim, dtoTakim);

	        // Oyuncu isimlerini alıp listeye ekleyelim
	        List<String> oyuncularUsername = new ArrayList<>();
	        for (Oyuncu oyuncu : takim.getOyuncular()) {
	            if (oyuncu.getUser() != null && oyuncu.getUser().getUsername() != null) {
	                oyuncularUsername.add(oyuncu.getUser().getUsername());
	            }
	        }

	        dtoTakim.setOyuncuUsernames(oyuncularUsername);

	        takimListesi.add(dtoTakim);
	    }

	    return takimListesi;
	    }

	@Override
	public DtoTakim getTakimByName(String name) {
		
		Takim takim = takimRepository.findByName(name)
		        .orElseThrow(() -> new RuntimeException("Takım bulunamadı"));

		    DtoTakim dtoTakim = new DtoTakim();
		    BeanUtils.copyProperties(takim, dtoTakim);

		    // Oyuncuların sadece kullanıcı adlarını ekle
		    List<String> oyuncularUsername = new ArrayList<>();
		    for (Oyuncu oyuncu : takim.getOyuncular()) {
		        oyuncularUsername.add(oyuncu.getUser().getUsername());
		    }
		    dtoTakim.setOyuncuUsernames(oyuncularUsername);

		    return dtoTakim;
	}

	
	
	
	
	}
