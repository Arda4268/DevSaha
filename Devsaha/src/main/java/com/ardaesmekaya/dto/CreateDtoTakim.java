package com.ardaesmekaya.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class CreateDtoTakim {

	private String name;
	
	private String sehir;
    
	private List<String> oyuncuUsernames;
}
