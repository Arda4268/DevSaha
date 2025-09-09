package com.ardaesmekaya.starter;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
@EntityScan(basePackages = {"com.ardaesmekaya"})
@EnableJpaRepositories(basePackages = {"com.ardaesmekaya"})
@ComponentScan(basePackages = {"com.ardaesmekaya"})
@SpringBootApplication
public class DevsahaApplication {

	public static void main(String[] args) {
		SpringApplication.run(DevsahaApplication.class, args);
	}

}
