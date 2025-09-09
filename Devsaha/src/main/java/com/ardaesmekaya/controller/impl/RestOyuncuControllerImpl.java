package com.ardaesmekaya.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ardaesmekaya.controller.IRestOyuncuController;
import com.ardaesmekaya.dto.DtoOyuncu;
import com.ardaesmekaya.dto.DtoOyuncuGolAsistRequest;
import com.ardaesmekaya.dto.DtoOyuncuGolAsistResponse;
import com.ardaesmekaya.dto.DtoOyuncuIU;
import com.ardaesmekaya.model.Oyuncu;
import com.ardaesmekaya.service.IOyuncuService;

@RestController
//@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/oyuncu")
public class RestOyuncuControllerImpl implements IRestOyuncuController {
	
	@Autowired
	private IOyuncuService oyuncuService;

	
	@GetMapping("/{id}")
	@Override
	public DtoOyuncu findOyuncuById(@PathVariable(value = "id") Long id) {
		return oyuncuService.findOyuncuById(id);
	}
	
	
	@GetMapping("/list")
	@Override
	public List<DtoOyuncu> getAllOyuncu() {
		return oyuncuService.getAllOyuncu();
	}
	
	
	@PostMapping("/update/{id}")
	@Override
	public DtoOyuncu updateOyuncu(@PathVariable(value = "id") Long id,@RequestBody DtoOyuncuIU dtoOyuncuIU) {
		return oyuncuService.updateOyuncu(id, dtoOyuncuIU);
	}
	
	
	@GetMapping("/by-username/{username}")
	
	@Override
	public ResponseEntity<DtoOyuncu> getOyuncuByUsername(@PathVariable String username) {
		DtoOyuncu dtoOyuncu = oyuncuService.getOyuncuByUsername(username);
        return ResponseEntity.ok(dtoOyuncu);  // Oyuncu ve takım bilgilerini döndürüyoruz
	}
	
	
	@GetMapping("/sirali")
	@Override
	public ResponseEntity<List<DtoOyuncu>> getSiraliOyuncular() {
		return ResponseEntity.ok(oyuncuService.getSiraliOyuncular());
	}

	@PostMapping("/{username}/gol-asist")
	@Override
	public ResponseEntity<DtoOyuncuGolAsistResponse> updateGolAsist(@PathVariable String username, @RequestBody DtoOyuncuGolAsistRequest req) {
		DtoOyuncuGolAsistResponse result = oyuncuService.updateGolAsist(username, req);
        return ResponseEntity.ok(result);
	}

	
	
	
}
