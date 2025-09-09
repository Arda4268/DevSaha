package com.ardaesmekaya.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DtoRandevuUI extends DtoBase {
	
	private Long halisahaId;
	
	private Long sahaId;
    
	private Long takim1Id;
    
	private Long takim2Id;
    
	private LocalDateTime tarih;

}
