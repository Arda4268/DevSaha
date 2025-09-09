package com.ardaesmekaya.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ardaesmekaya.dto.CreateDtoTakim;
import com.ardaesmekaya.dto.DtoOyuncu;
import com.ardaesmekaya.dto.DtoTakim;
import com.ardaesmekaya.dto.UpdateDtoTakim;

public interface ITakimService {

	public DtoTakim createTakim(CreateDtoTakim dto);
	
	public DtoTakim updateTakim(Long id ,UpdateDtoTakim dto);
	
	public void deleteTakim(Long id);
	
	public List<DtoTakim> getAllTakim();
	
	public DtoTakim getTakimByName(String name);
	

}
