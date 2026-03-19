// src/main/java/com/carsales/repository/ContractRepository.java
package com.carsales.repository;

import com.carsales.entity.Contract;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContractRepository extends JpaRepository<Contract, Long> {
}