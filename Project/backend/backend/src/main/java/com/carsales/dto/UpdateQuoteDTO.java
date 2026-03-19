// src/main/java/com/carsales/dto/UpdateQuoteDTO.java
package com.carsales.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class UpdateQuoteDTO {
    private BigDecimal price;
    private String note;
    private String status;
}