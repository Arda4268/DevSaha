package com.ardaesmekaya.controller;

import java.util.List;

import com.ardaesmekaya.dto.DtoRandevu;
import com.ardaesmekaya.dto.DtoRandevuDurumGuncelle;
import com.ardaesmekaya.dto.DtoRandevuUI;

public interface IRestRandevuController {
	
	public DtoRandevu createRandevu(DtoRandevuUI dto);
	
	public DtoRandevu updateRandevuDurum(Long id,DtoRandevuDurumGuncelle dto);
	
	public List<DtoRandevu> getRandevularByDurum(DtoRandevuDurumGuncelle dto);
	
	public DtoRandevu getRandevuById(Long id);
	

}
