package com.ardaesmekaya.service;

import com.ardaesmekaya.dto.OyuncuMarketiCreateDto;
import com.ardaesmekaya.dto.OyuncuMarketiDto;
import com.ardaesmekaya.model.OyuncuMarketi;

public interface IOyuncuMarketiService {
	
	public OyuncuMarketiDto createMarketItem(OyuncuMarketiCreateDto dto);
	
	public OyuncuMarketiDto mapToDto(OyuncuMarketi m);

}
