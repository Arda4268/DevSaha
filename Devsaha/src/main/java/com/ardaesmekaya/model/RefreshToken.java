package com.ardaesmekaya.model;

import java.util.Date;



import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "refresh_token")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RefreshToken extends BaseEntity{

	private String refreshToken;
	
	private Date expireDate;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
}
