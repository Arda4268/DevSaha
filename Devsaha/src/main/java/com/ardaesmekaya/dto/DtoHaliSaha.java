package com.ardaesmekaya.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DtoHaliSaha extends DtoBase{
	
	
	private String name;
	
	private String adres;
	
	private String htelefon;
	
	private String fiyat;
	
	private DtoSaha saha;
	

	
}
