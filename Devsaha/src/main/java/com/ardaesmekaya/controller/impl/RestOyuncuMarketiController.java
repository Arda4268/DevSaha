package com.ardaesmekaya.controller.impl;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ardaesmekaya.dto.OyuncuMarketiCreateDto;
import com.ardaesmekaya.dto.OyuncuMarketiDto;
import com.ardaesmekaya.service.IOyuncuMarketiService;


import jakarta.validation.Valid;

@RestController
@RequestMapping("/oyuncu-marketi")
public class RestOyuncuMarketiController {
	
	@Autowired
    private IOyuncuMarketiService marketService;


    @PostMapping("/ekle")
    public ResponseEntity<OyuncuMarketiDto> ekle(
            @Valid @RequestBody OyuncuMarketiCreateDto dto) {
        OyuncuMarketiDto result = marketService.createMarketItem(dto);
        return ResponseEntity.ok(result);
    }
}
