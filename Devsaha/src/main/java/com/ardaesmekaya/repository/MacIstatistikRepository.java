package com.ardaesmekaya.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ardaesmekaya.model.Macİstatistik;

@Repository
public interface MacIstatistikRepository extends JpaRepository<Macİstatistik, Long> {
	
	Optional<Macİstatistik> findByOyuncuIdAndMacId(Long oyuncuId, Long macId);

}
