package com.ardaesmekaya.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



public class IstatistikDto extends DtoBase{
	
    private Long oyuncuId;
    private Long macId;
    private int gol;
    private int asist;

    public IstatistikDto() {}

    public IstatistikDto(Long oyuncuId, Long macId, int gol, int asist) {
        this.oyuncuId = oyuncuId;
        this.macId     = macId;
        this.gol       = gol;
        this.asist     = asist;
    }

    public Long getOyuncuId() { return oyuncuId; }
    public void setOyuncuId(Long oyuncuId) { this.oyuncuId = oyuncuId; }

    public Long getMacId() { return macId; }
    public void setMacId(Long macId) { this.macId = macId; }

    public int getGol() { return gol; }
    public void setGol(int gol) { this.gol = gol; }

    public int getAsist() { return asist; }
    public void setAsist(int asist) { this.asist = asist; }


}
