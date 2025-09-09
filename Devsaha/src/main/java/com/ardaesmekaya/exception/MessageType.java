package com.ardaesmekaya.exception;

import lombok.Getter;

@Getter
public enum MessageType {

	NO_RECORD_EXİST("1004","KAYIT BULUNUMADI"),
	TOKEN_IS_EXPIRED("1005" , "TOKENIN SÜRESİ DOLMUŞTUR"),
	USERNAME_NOT_FOUND("1006", "USERNAME BULUNUMADI"),
	USERNAME_OR_PASSWORD_INVALID("1007" , "KULLANICI ADI VEYA ŞİFRE HATALI"),
	REFRESH_TOKEN_NOT_FOUND("1008" , "REFRESHTOKEN BULUNAMADI"),
	REFRESH_TOKEN_İS_EXPİRED("1009" , "REFRESHTOKEN SÜRESİ DOLMUŞTUR"),
	GENERAL_EXCEPTİON("9999" , "GENEL BİR HATA OLUŞTU");
	
	private String code;
	private String message;
	
	MessageType(String code , String message) {
		this.code = code;
		this.message = message;
		
	}
}
