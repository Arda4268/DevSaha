package com.ardaesmekaya.dto;

import java.time.LocalDateTime;

import com.ardaesmekaya.enums.OyuncuMarketDurum;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OyuncuMarketiDto {

	 private Long id;
	 
	 private OyuncuDto oyuncu;
	 
	 private LocalDateTime tarih;
	 
	 private String aciklama;
	 
	 private String fiyat;
	 
	 private OyuncuMarketDurum durum;
}
