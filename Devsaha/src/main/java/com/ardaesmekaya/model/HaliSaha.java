package com.ardaesmekaya.model;


import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "hali_saha")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HaliSaha extends BaseEntity{
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "adres")
	private String adres;
	
	@Column(name = "htelefon")
	private String htelefon;
	
	@Column(name = "fiyat")
	private String fiyat;
	
	@OneToOne
    @JoinColumn(name = "user_id")
    private User user;
	
	@OneToOne(mappedBy = "haliSaha", cascade = CascadeType.ALL)
	private Saha saha;
	
	@OneToMany(mappedBy = "haliSaha")  // Saha'dan gelen bağlantı.
    private List<Randevu> randevular;
	
	@Column(name = "ratingh")
	private String ratingH;
	
	
	

}
