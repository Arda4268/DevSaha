package com.ardaesmekaya.controller;

import org.springframework.http.ResponseEntity;

import com.ardaesmekaya.dto.DtoSaha;
import com.ardaesmekaya.dto.DtoSahaUI;

public interface IRestSahaController {
	
	public ResponseEntity<DtoSaha> createSaha(DtoSahaUI dto);

}
