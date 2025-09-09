package com.ardaesmekaya.service;


import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ardaesmekaya.dto.DtoOyuncu;
import com.ardaesmekaya.dto.DtoOyuncuGolAsistRequest;
import com.ardaesmekaya.dto.DtoOyuncuGolAsistResponse;
import com.ardaesmekaya.dto.DtoOyuncuIU;
import com.ardaesmekaya.model.Oyuncu;

public interface IOyuncuService {
	
	public DtoOyuncu findOyuncuById(Long id);
	
	public DtoOyuncu getOyuncuByUsername(String username);
	
	public List<DtoOyuncu> getAllOyuncu();
	
	public DtoOyuncu updateOyuncu(Long id , DtoOyuncuIU dtoOyuncuIU);
	
	public List<DtoOyuncu> getSiraliOyuncular();
	
	public DtoOyuncuGolAsistResponse updateGolAsist(String username, DtoOyuncuGolAsistRequest request);
	

	
	}

