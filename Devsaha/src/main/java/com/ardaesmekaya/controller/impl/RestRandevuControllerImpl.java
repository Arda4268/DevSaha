package com.ardaesmekaya.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ardaesmekaya.controller.IRestRandevuController;
import com.ardaesmekaya.dto.DtoRandevu;
import com.ardaesmekaya.dto.DtoRandevuDurumGuncelle;
import com.ardaesmekaya.dto.DtoRandevuUI;
import com.ardaesmekaya.service.IRandevuService;

@RestController
@RequestMapping("/randevu")
//@CrossOrigin(origins = "http://localhost:5173")
public class RestRandevuControllerImpl implements IRestRandevuController{

	@Autowired
    private IRandevuService randevuService;

    @PostMapping("/create")
    public DtoRandevu createRandevu(@RequestBody DtoRandevuUI dto) {
        return randevuService.createRandevu(dto);
    }
    
    @PutMapping("/{id}/durum")
	@Override
	public DtoRandevu updateRandevuDurum(@PathVariable Long id, @RequestBody DtoRandevuDurumGuncelle dto) {
		return randevuService.updateRandevuDurum(id, dto);
	}
    
    @PostMapping("/list/durum")
	@Override
	public List<DtoRandevu> getRandevularByDurum(@RequestBody DtoRandevuDurumGuncelle dto) {
		 return randevuService.getRandevularByDurum(dto);
	}
    
    @GetMapping("/list/{id}")
	@Override
	public DtoRandevu getRandevuById(@PathVariable Long id) {
		return randevuService.getRandevuById(id);
	}
	

}
