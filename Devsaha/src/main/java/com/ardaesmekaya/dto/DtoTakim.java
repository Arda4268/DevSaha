package com.ardaesmekaya.dto;


import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DtoTakim extends DtoBase {
	
    private String name;
   
    private String sehir;
    
    private String oynananMaç;
    
    private String atilanGol;
    
    private String yenilenGol;
    
    private String galibiyet;
    
    private String maglubiyet;
    
    private List<String> oyuncuUsernames;
    


}
