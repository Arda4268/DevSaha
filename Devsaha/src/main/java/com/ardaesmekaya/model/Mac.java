package com.ardaesmekaya.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "mac")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Mac extends BaseEntity{
	
	@Column(name = "tarih")
    private LocalDateTime tarih;  
	
	@ManyToOne
	@JoinColumn(name = "takim1_id") 
	private Takim takim1;
	    
	@ManyToOne
	@JoinColumn(name = "takim2_id")  
	private Takim takim2;
	
	@OneToOne
    @JoinColumn(name = "randevu_id")
    private Randevu randevu;  

    @Column(name = "takim1_skor")
    private Integer takim1Skor; 
    
    @Column(name = "takim2_skor")
    private Integer takim2Skor; 
    
}
