package com.ardaesmekaya.controller.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ardaesmekaya.controller.IRestAuthenticationController;
import com.ardaesmekaya.controller.RestBaseController;
import com.ardaesmekaya.controller.RootEntity;
import com.ardaesmekaya.dto.AuthRequest;
import com.ardaesmekaya.dto.AuthRequestt;
import com.ardaesmekaya.dto.AuthResponse;
import com.ardaesmekaya.dto.DtoUser;
import com.ardaesmekaya.dto.RefreshTokenRequest;
import com.ardaesmekaya.service.IAuthenticationService;

import jakarta.validation.Valid;

@RestController
//@CrossOrigin(origins = "http://localhost:5173")
public class RestAuthenticationControllerImpl extends RestBaseController implements IRestAuthenticationController{
	
	@Autowired
	private IAuthenticationService authenticationService;
	
	@PostMapping("/register")
	@Override
	public RootEntity<DtoUser> register(@Valid @RequestBody AuthRequest request) {
		return ok(authenticationService.register(request));
	}
	
	@PostMapping("/authenticate")
	@Override
	public RootEntity<AuthResponse> authenticate(@Valid @RequestBody AuthRequestt requestt) {
		return ok(authenticationService.authenticate(requestt));
	}
	
	@PostMapping("/refreshtoken")
	@Override
	public RootEntity<AuthResponse> refreshToken(@Valid @RequestBody RefreshTokenRequest input) {
		// TODO Auto-generated method stub
		return ok(authenticationService.refreshToken(input));
	}

}
