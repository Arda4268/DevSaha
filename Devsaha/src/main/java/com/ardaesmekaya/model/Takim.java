package com.ardaesmekaya.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "takim")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Takim extends BaseEntity {
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "sehir")
	private String sehir;
	
	@Column(name = "oynanan_maç")
	private String oynananMaç;
	
	@Column(name = "atilan_gol")
	private String atilanGol;
	
	@Column(name = "yenilen_gol")
	private String yenilenGol;
	
	@Column(name = "galibiyet")
	private String galibiyet;
	
	@Column(name = "maglubiyet")
	private String maglubiyet;
	
	@OneToMany(mappedBy = "takim", cascade = CascadeType.ALL)
	@JsonManagedReference
    private List<Oyuncu> oyuncular;
	

	
	
	

}

