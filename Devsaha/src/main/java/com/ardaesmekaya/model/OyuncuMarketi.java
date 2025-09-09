 package com.ardaesmekaya.model;

import java.time.LocalDateTime;

import com.ardaesmekaya.enums.OyuncuMarketDurum;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "oyuncu_marketi")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OyuncuMarketi extends BaseEntity{
	
	@OneToOne
	@JoinColumn(name = "oyuncu_id")
	private Oyuncu oyuncu;
	
	@Column(name = "tarih")
    private LocalDateTime tarih;
	
	@Column(name = "acıklama")
	private String acıklama;
	
	@Column(name = "fiyat")
    private String fiyat;
	
	@Column(name = "durum")
    private OyuncuMarketDurum durum;
	
	

}
