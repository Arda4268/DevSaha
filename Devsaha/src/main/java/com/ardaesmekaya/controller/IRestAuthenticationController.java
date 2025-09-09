package com.ardaesmekaya.controller;



import com.ardaesmekaya.dto.AuthRequest;
import com.ardaesmekaya.dto.AuthRequestt;
import com.ardaesmekaya.dto.AuthResponse;
import com.ardaesmekaya.dto.DtoUser;
import com.ardaesmekaya.dto.RefreshTokenRequest;


public interface IRestAuthenticationController {
	
	public RootEntity<DtoUser> register(AuthRequest request);
	
	public RootEntity<AuthResponse> authenticate(AuthRequestt requestt);
	
	public RootEntity<AuthResponse> refreshToken(RefreshTokenRequest input);

}
