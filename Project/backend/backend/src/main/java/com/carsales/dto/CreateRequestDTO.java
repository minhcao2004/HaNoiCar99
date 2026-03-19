// src/main/java/com/carsales/dto/CreateRequestDTO.java
package com.carsales.dto;

import lombok.Data;

@Data
public class CreateRequestDTO {
    private String customerName;
    private String phone;
    private String email;
}