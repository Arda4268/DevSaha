package com.ardaesmekaya.model;

import java.time.LocalDateTime;

import com.ardaesmekaya.enums.RandevuDurum;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "randevu")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Randevu extends BaseEntity{
	
	@Column(name = "tarih")
	private LocalDateTime tarih;  

	@ManyToOne
	@JoinColumn(name = "takim1_id")
	private Takim takim1; 

	@ManyToOne
	@JoinColumn(name = "takim2_id")
	private Takim takim2; 
	
	@ManyToOne
    @JoinColumn(name = "saha_id")
    private Saha saha;
	
	@OneToOne
	@JoinColumn(name = "hali_saha_id")
	private HaliSaha haliSaha;
	
	@OneToOne
    @JoinColumn(name = "mac_id")
    private Mac mac; 
	
	@Enumerated(EnumType.STRING)
    @Column(name = "durum")
    private RandevuDurum durum;

}
