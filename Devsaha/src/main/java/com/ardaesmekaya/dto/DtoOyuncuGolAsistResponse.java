package com.ardaesmekaya.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DtoOyuncuGolAsistResponse extends DtoBase{

	private String username;
	
	private String gol;    // Entity’de String, uyumlu olması için String tuttuk
	
	private String asist;
}
