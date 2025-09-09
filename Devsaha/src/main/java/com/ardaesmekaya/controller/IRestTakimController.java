package com.ardaesmekaya.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import com.ardaesmekaya.dto.CreateDtoTakim;
import com.ardaesmekaya.dto.DtoOyuncu;
import com.ardaesmekaya.dto.DtoTakim;
import com.ardaesmekaya.dto.UpdateDtoTakim;

public interface IRestTakimController {
	
	public DtoTakim createTakim(CreateDtoTakim dto);
	
	public ResponseEntity<DtoTakim> updateTakim(Long id ,UpdateDtoTakim dto);
	
	public ResponseEntity<Void> deleteTakim(Long id);
	
	public List<DtoTakim> getAllTakim();
	
	public ResponseEntity<DtoTakim> getTakimByName(String name);
	

	
	
}
