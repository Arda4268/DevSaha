package com.ardaesmekaya.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MacListDto {
	/** Maçın ID’si */
    private Long matchId;
    /** 1. takımın adı */
    private String takim1;
    /** 1. takımın skoru */
    private Integer takim1Skor;
    /** 2. takımın skoru */
    private String takim2;
    private Integer takim2Skor;
    /** İlişkili randevu ID’si */
    private Long randevuId;

}
