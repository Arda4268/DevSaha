package com.ardaesmekaya.repository;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ardaesmekaya.model.Takim;

@Repository
public interface TakimRepository extends JpaRepository<Takim, Long>{	
	
	boolean existsByName(String name);
	
	Optional<Takim> findByName(String name);

}
