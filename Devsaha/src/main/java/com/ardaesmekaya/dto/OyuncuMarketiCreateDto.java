package com.ardaesmekaya.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OyuncuMarketiCreateDto {
	
	@NotNull
    private Long oyuncuId;

    @NotNull @Size(min = 5, max = 500)
    private String aciklama;

    @NotNull @Size(min = 1, max = 20)
    private String fiyat;

}
