package com.ardaesmekaya.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ardaesmekaya.model.Mac;

@Repository
public interface MacRepository extends JpaRepository<Mac, Long>{

}
