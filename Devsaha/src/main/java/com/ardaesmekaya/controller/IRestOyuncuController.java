package com.ardaesmekaya.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.ardaesmekaya.dto.DtoOyuncu;
import com.ardaesmekaya.dto.DtoOyuncuGolAsistRequest;
import com.ardaesmekaya.dto.DtoOyuncuGolAsistResponse;
import com.ardaesmekaya.dto.DtoOyuncuIU;
import com.ardaesmekaya.model.Oyuncu;

public interface IRestOyuncuController {

	public DtoOyuncu findOyuncuById(Long id);
	
	public List<DtoOyuncu> getAllOyuncu();
	
	public DtoOyuncu updateOyuncu(Long id , DtoOyuncuIU dtoOyuncuIU);
	
	public ResponseEntity<DtoOyuncu> getOyuncuByUsername(String username);
	
	public ResponseEntity<List<DtoOyuncu>> getSiraliOyuncular();
	
	public ResponseEntity<DtoOyuncuGolAsistResponse> updateGolAsist(String username,DtoOyuncuGolAsistRequest req);
	
}
