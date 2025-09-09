package com.ardaesmekaya.service;

import java.util.List;

import com.ardaesmekaya.dto.DtoRandevu;
import com.ardaesmekaya.dto.DtoRandevuDurumGuncelle;
import com.ardaesmekaya.dto.DtoRandevuUI;

public interface IRandevuService {
	
	public DtoRandevu createRandevu(DtoRandevuUI dto);
	
	public DtoRandevu updateRandevuDurum(Long randevuId, DtoRandevuDurumGuncelle dto);

	public List<DtoRandevu> getRandevularByDurum(DtoRandevuDurumGuncelle dto);
	
	public DtoRandevu getRandevuById(Long id);
}
