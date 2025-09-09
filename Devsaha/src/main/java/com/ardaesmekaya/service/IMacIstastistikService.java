package com.ardaesmekaya.service;

import com.ardaesmekaya.dto.IstatistikDto;

public interface IMacIstastistikService {
	
	public IstatistikDto ekleVeGetir(Long oyuncuId, Long macId, int gol, int asist);

}
