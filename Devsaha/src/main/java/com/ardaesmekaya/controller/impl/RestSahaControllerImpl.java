package com.ardaesmekaya.controller.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ardaesmekaya.controller.IRestSahaController;
import com.ardaesmekaya.dto.DtoSaha;
import com.ardaesmekaya.dto.DtoSahaUI;
import com.ardaesmekaya.service.ISahaService;

@RestController
@RequestMapping("/saha")
//@CrossOrigin(origins = "http://localhost:5173")
public class RestSahaControllerImpl implements IRestSahaController{
	
	@Autowired
	private ISahaService sahaService;

	@PostMapping("/create")
	@Override
	public ResponseEntity<DtoSaha> createSaha(@RequestBody DtoSahaUI dto) {
		 DtoSaha dtoSaha = sahaService.createSaha(dto);
	        return ResponseEntity.ok(dtoSaha);
	}
	

}
