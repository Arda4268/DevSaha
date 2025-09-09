package com.ardaesmekaya.model;

import com.ardaesmekaya.enums.SahaDurum;

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
@Table(name = "saha")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Saha extends BaseEntity{
	
	@Column(name = "name")
	private String name;
	
	@OneToOne
	@JoinColumn(name = "halisaha_id")
    private HaliSaha haliSaha;
	
	@Column(name = "durum")
	private SahaDurum durum;
	
	
	
	

}
