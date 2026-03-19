// src/main/java/com/carsales/dto/CreateQuoteDTO.java
package com.carsales.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class CreateQuoteDTO {
    private Long requestId;
    private BigDecimal price;
    private String note;
}