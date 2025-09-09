package com.ardaesmekaya.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ardaesmekaya.model.Oyuncu;

@Repository
public interface OyuncuRepository extends JpaRepository<Oyuncu, Long>{

	 // Kullanıcı adı listesine göre oyuncuları bul
    List<Oyuncu> findByUser_UsernameIn(List<String> usernames);
    
    Oyuncu findByUser_Username(String username);
}
