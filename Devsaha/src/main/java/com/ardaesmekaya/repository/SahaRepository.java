package com.ardaesmekaya.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ardaesmekaya.model.Saha;

@Repository
public interface SahaRepository extends JpaRepository<Saha, Long>{

}
