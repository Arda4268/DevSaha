package com.ardaesmekaya.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.ardaesmekaya.handler.AuthEntryPoint;
import com.ardaesmekaya.jwt.JwtAuthenticationFilter;
import com.ardaesmekaya.model.Oyuncu;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	private static final String AUTHENTICATE ="/authenticate";
	private static final String REGISTER ="/register";
	private static final String REFRESH_TOKEN ="/refreshtoken";
	private static final String OYUNCU ="oyuncu/sirali";
	private static final String TAKIM  ="takim/list";
	private static final String HALISAHA  ="halisaha/list";
	
	
	
	@Autowired
	private AuthenticationProvider authenticationProvider;
	
	@Autowired
	private AuthEntryPoint authEntryPoint;
	  
	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;
	
	
	@Bean
	public SecurityFilterChain filtecChain(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable()	
		.authorizeHttpRequests(request-> 
		 request.requestMatchers(AUTHENTICATE , REGISTER , REFRESH_TOKEN , OYUNCU , TAKIM , HALISAHA).permitAll()
		.anyRequest()
		.authenticated())
		.exceptionHandling().authenticationEntryPoint(authEntryPoint).and()
		.sessionManagement(session-> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
		.authenticationProvider(authenticationProvider)
		.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}

}
