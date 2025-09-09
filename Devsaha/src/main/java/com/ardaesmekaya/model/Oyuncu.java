package com.ardaesmekaya.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "oyuncu")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Oyuncu extends BaseEntity{
	
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "last_name")
	private String lastName;
	
	@Column(name = "yas")
	private String yas;
	
	@Column(name = "sehir")
	private String sehir;
	
	@Column(name = "telefon")
	private String telefon;
	
	@Column(name = "pozisyon")
	private String pozisyon;

	@Column(name = "ayak")
	private String ayak;
	
	@Column(name = "oynanan_maç")
	private String oynananMaç;
	
	@Column(name = "gol")
	private String gol;
	
	@Column(name = "asist")
	private String asist;
	
	@Column(name = "galibiyet")
	private String galibiyet;
	
	@Column(name = "maglubiyet")
	private String maglubiyet;
	
	@OneToOne
	@JoinColumn(name = "user_id")
	@JsonIgnore
	private User user;
	
	@ManyToOne
	@JoinColumn(name = "takim_id")
	@JsonManagedReference
	private Takim takim;
	
	
	
	
	
	
	

	
	
}
