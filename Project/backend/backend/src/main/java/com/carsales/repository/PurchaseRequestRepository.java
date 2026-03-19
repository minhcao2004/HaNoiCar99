// src/main/java/com/carsales/repository/PurchaseRequestRepository.java
package com.carsales.repository;

import com.carsales.entity.PurchaseRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseRequestRepository extends JpaRepository<PurchaseRequest, Long> {
}