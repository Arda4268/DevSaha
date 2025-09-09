package com.ardaesmekaya.model;

import com.ardaesmekaya.enums.Role;

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
@Table(name = "mac_istatistik")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Macİstatistik extends BaseEntity{
	
	@OneToOne
	@JoinColumn(name = "oyuncu_id")
	private Oyuncu oyuncu;
	
	@OneToOne
	@JoinColumn(name = "mac_id")
	private Mac mac ;
	
	@Column(name = "gol")
	private String gol;
	
	@Column(name = "asist")
	private String asist;

}
