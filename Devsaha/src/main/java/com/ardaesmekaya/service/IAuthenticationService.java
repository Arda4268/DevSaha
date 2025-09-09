package com.ardaesmekaya.service;

import com.ardaesmekaya.dto.AuthRequest;
import com.ardaesmekaya.dto.AuthRequestt;
import com.ardaesmekaya.dto.AuthResponse;
import com.ardaesmekaya.dto.DtoUser;
import com.ardaesmekaya.dto.RefreshTokenRequest;

public interface IAuthenticationService {
	
	public DtoUser register(AuthRequest request);
	
	public AuthResponse authenticate(AuthRequestt requestt);
	
	public AuthResponse refreshToken(RefreshTokenRequest input);

}
