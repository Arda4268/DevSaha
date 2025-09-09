package com.ardaesmekaya.dto;

import java.time.LocalDateTime;

import com.ardaesmekaya.enums.RandevuDurum;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DtoRandevu extends DtoBase{

		
	    private LocalDateTime tarih;
	    
	    private RandevuDurum durum;
	    
	    private String halisahaUsername;
	    
	    private String takim1;
	    
	    private String takim2;
	    
	    private Long macId;
}
