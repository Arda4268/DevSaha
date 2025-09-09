package com.ardaesmekaya.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ardaesmekaya.model.OyuncuMarketi;

@Repository
public interface OyuncuMarketiRepository extends JpaRepository<OyuncuMarketi, Long> {

}
