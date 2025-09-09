package com.ardaesmekaya.dto;

import com.ardaesmekaya.model.Takim;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DtoOyuncu extends DtoBase {

	private String firstName;
	
	private String lastName;
	
	private String yas;
	
	private String sehir;
	
	private String telefon;
	
	private String pozisyon;

	private String ayak;
	
	private String gol;
	
	private String asist;
	
	private String galibiyet;
	
	private String maglubiyet;
	
	private DtoTakim takim;
	

	
}
