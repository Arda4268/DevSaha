package com.ardaesmekaya.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;


import com.ardaesmekaya.dto.DtoHaliSaha;
import com.ardaesmekaya.dto.DtoOyuncu;


public interface IRestHaliSahaController {
	
	public ResponseEntity<DtoHaliSaha> getHaliSahaByUsername(String username);
	
	public List<DtoHaliSaha> getAllHalisaha();
	


}
