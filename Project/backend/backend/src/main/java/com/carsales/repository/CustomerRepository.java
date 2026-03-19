// src/main/java/com/carsales/repository/CustomerRepository.java
package com.carsales.repository;

import com.carsales.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByPhone(String phone);
}