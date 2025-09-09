package com.ardaesmekaya.controller;

import org.springframework.http.ResponseEntity;

import com.ardaesmekaya.dto.IstatistikDto;

public interface IRestMacIstatistikController {
	
	public ResponseEntity<IstatistikDto> ekle(IstatistikDto req);
	
}

