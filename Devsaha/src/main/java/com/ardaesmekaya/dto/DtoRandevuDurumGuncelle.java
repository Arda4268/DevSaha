package com.ardaesmekaya.dto;

import com.ardaesmekaya.enums.RandevuDurum;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DtoRandevuDurumGuncelle extends DtoBase{
	
	private RandevuDurum durum;

}
