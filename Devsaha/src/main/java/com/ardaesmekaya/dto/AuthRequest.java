package com.ardaesmekaya.dto;


import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthRequest {
	
	@NotEmpty
	private String username;
	
	@NotEmpty
	private String password;
	
	@NotEmpty
	private String role;
	
	@NotEmpty
	private String firstName;
	
	@NotEmpty
	private String lastName;
	
	@NotEmpty
	private String yas;
	
	@NotEmpty
	private String sehir;
	
	@NotEmpty
	private String telefon;
	
	@NotEmpty
	private String pozisyon;

	@NotEmpty
	private String ayak;
	
	
	@NotEmpty
	private String name;
	
	@NotEmpty
	private String adres;
	
	@NotEmpty
	private String htelefon;
	
	@NotEmpty
	private String fiyat;
	
	
	
	
	

}
