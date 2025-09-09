package com.ardaesmekaya.controller.impl;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ardaesmekaya.controller.IRestTakimController;
import com.ardaesmekaya.dto.CreateDtoTakim;
import com.ardaesmekaya.dto.DtoOyuncu;
import com.ardaesmekaya.dto.DtoTakim;
import com.ardaesmekaya.dto.UpdateDtoTakim;
import com.ardaesmekaya.service.ITakimService;

@RestController
@RequestMapping("/takim")
//@CrossOrigin(origins = "http://localhost:5173")
public class RestTakimControllerImpl implements IRestTakimController{
	
	@Autowired
	private ITakimService takimService;

	@PostMapping("/create")
	@Override
	public DtoTakim createTakim(@RequestBody CreateDtoTakim dto) {
		return takimService.createTakim(dto);
	}
	
	@PostMapping("/update/{id}")
	@Override
	public ResponseEntity<DtoTakim> updateTakim(@PathVariable(value = "id") Long id, @RequestBody UpdateDtoTakim dto) {
		DtoTakim updated = takimService.updateTakim(id, dto);
	    return ResponseEntity.ok(updated);
	}

	@DeleteMapping("/delete/{id}")
	@Override
	public ResponseEntity<Void> deleteTakim(@PathVariable(value = "id") Long id) {
		System.out.println("Silinecek takım ID: " + id); // log ekle
	    takimService.deleteTakim(id);
	    return ResponseEntity.ok().build();
	}

	@GetMapping("/list")
	@Override
	public List<DtoTakim> getAllTakim() {
		return takimService.getAllTakim();
	}

	@GetMapping("/by-name/{name}")
	@Override
	public ResponseEntity<DtoTakim> getTakimByName(@PathVariable String name) {
		 DtoTakim dtoTakim = takimService.getTakimByName(name);
		    return ResponseEntity.ok(dtoTakim);
	}
	
	
	
	
		

}
