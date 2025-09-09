package com.ardaesmekaya.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ardaesmekaya.enums.RandevuDurum;
import com.ardaesmekaya.model.Randevu;

@Repository
public interface RandevuRepository extends JpaRepository<Randevu, Long>{

	List<Randevu> findByDurum(RandevuDurum durum);
	
	Optional<Randevu> findById(Long id);
}
