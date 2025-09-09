package com.ardaesmekaya.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.ardaesmekaya.dto.MacListDto;
import com.ardaesmekaya.dto.MacUpdateDto;
import com.ardaesmekaya.model.Mac;

public interface IRestMacController {

	 public ResponseEntity<Mac> updateMatch(MacUpdateDto dto);
	 
	 ResponseEntity<List<MacListDto>> listMatches();
}
