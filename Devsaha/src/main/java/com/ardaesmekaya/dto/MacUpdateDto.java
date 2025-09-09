package com.ardaesmekaya.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MacUpdateDto {
	/** Güncellenecek maçın ID’si */
    private Long matchId;
    /** 1. takımın maçta attığı gol sayısı */
    private Integer takim1Skor;
    /** 2. takımın maçta attığı gol sayısı */
    private Integer takim2Skor;

}
