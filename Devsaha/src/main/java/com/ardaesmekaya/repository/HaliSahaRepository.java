package com.ardaesmekaya.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ardaesmekaya.model.HaliSaha;
import com.ardaesmekaya.model.Oyuncu;

@Repository
public interface HaliSahaRepository extends JpaRepository<HaliSaha, Long> {
	
    List<HaliSaha> findByUser_UsernameIn(List<String> usernames);
    
    HaliSaha findByUser_Username(String username);

}
