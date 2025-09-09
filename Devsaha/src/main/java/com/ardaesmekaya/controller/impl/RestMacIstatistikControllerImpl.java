package com.ardaesmekaya.controller.impl;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ardaesmekaya.controller.IRestMacIstatistikController;
import com.ardaesmekaya.dto.IstatistikDto;
import com.ardaesmekaya.service.IMacIstastistikService;

@RestController
@RequestMapping("/istatistik")
public class RestMacIstatistikControllerImpl implements IRestMacIstatistikController{
	
	private IMacIstastistikService macIstastistikService;

	@PostMapping("/ekle")
    public ResponseEntity<IstatistikDto> ekle(@RequestBody IstatistikDto req) {
        IstatistikDto yanit = macIstastistikService.ekleVeGetir(
            req.getOyuncuId(),
            req.getMacId(),
            req.getGol(),
            req.getAsist()
        );
        return ResponseEntity.ok(yanit);
    }
}
	


