package com.ardaesmekaya.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ardaesmekaya.dto.DtoHaliSaha;
import com.ardaesmekaya.dto.DtoTakim;


public interface IHaliSahaService {
	
	public DtoHaliSaha getHaliSahaByUsername(String username);
	
	public List<DtoHaliSaha> getAllHaliSaha();
	
	
	
	

}
