// src/main/java/com/carsales/repository/QuoteRepository.java
package com.carsales.repository;

import com.carsales.entity.Quote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuoteRepository extends JpaRepository<Quote, Long> {
}