package com.ardaesmekaya.service;

import java.util.List;

import com.ardaesmekaya.dto.MacListDto;
import com.ardaesmekaya.dto.MacUpdateDto;
import com.ardaesmekaya.model.Mac;

public interface IMacService {
	
	public Mac updateMatchStats(MacUpdateDto dto);
	
	 public List<MacListDto> getAllMatches();
}
