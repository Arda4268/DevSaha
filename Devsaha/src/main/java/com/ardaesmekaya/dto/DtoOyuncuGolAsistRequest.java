package com.ardaesmekaya.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DtoOyuncuGolAsistRequest extends DtoBase{
	
    private String username;
    
    private int gol;
    
    private int asist;
}
