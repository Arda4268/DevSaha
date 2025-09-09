package com.ardaesmekaya.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ardaesmekaya.controller.IRestMacController;
import com.ardaesmekaya.dto.MacListDto;
import com.ardaesmekaya.dto.MacUpdateDto;
import com.ardaesmekaya.model.Mac;
import com.ardaesmekaya.service.IMacService;

@RestController
@RequestMapping("/mac")
public class RestMacControllerImpl implements IRestMacController{
	
	@Autowired
	private IMacService macService;

	@PutMapping("/update")
	@Override
	public ResponseEntity<Mac> updateMatch(@RequestBody MacUpdateDto dto) {
		Mac updated = macService.updateMatchStats(dto);
        return ResponseEntity.ok(updated);
	}

	@GetMapping("/list")
	@Override
	public ResponseEntity<List<MacListDto>> listMatches() {
		 List<MacListDto> dtos = macService.getAllMatches();
	        return ResponseEntity.ok(dtos);
	}

}
