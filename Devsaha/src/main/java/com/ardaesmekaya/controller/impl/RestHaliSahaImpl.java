package com.ardaesmekaya.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ardaesmekaya.controller.IRestHaliSahaController;
import com.ardaesmekaya.dto.DtoHaliSaha;

import com.ardaesmekaya.service.IHaliSahaService;

@RestController
@RequestMapping("/halisaha")

public class RestHaliSahaImpl implements IRestHaliSahaController{
	
	@Autowired
	private IHaliSahaService haliSahaService;

	@GetMapping("/by-username/{username}")
	@Override
	public ResponseEntity<DtoHaliSaha> getHaliSahaByUsername(@PathVariable String username) {
		DtoHaliSaha dtoHaliSaha = haliSahaService.getHaliSahaByUsername(username);
        return ResponseEntity.ok(dtoHaliSaha);
		
	}

	@GetMapping("/list")
	@Override
	public List<DtoHaliSaha> getAllHalisaha() {
		return haliSahaService.getAllHaliSaha();
	}
	

	
	
	

}
