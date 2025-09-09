package com.ardaesmekaya.controller;

import org.springframework.http.ResponseEntity;

import com.ardaesmekaya.dto.OyuncuMarketiCreateDto;
import com.ardaesmekaya.dto.OyuncuMarketiDto;

public interface IRestOyuncuMarketiController {
	
	public ResponseEntity<OyuncuMarketiDto> ekle(OyuncuMarketiCreateDto dto);

}
