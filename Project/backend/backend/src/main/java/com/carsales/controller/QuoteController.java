// src/main/java/com/carsales/controller/QuoteController.java
//Nguyen Minh Cao - 12/3/2026
package com.carsales.controller;

import com.carsales.dto.CreateQuoteDTO;
import com.carsales.dto.UpdateQuoteDTO;
import com.carsales.entity.Quote;
import com.carsales.service.SalesService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quotes")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class QuoteController {

    private final SalesService salesService;

    @GetMapping
    public List<Quote> getAll() {
        return salesService.getAllQuotes();
    }

    @PostMapping
    public Quote create(@RequestBody CreateQuoteDTO dto) {
        return salesService.createQuote(dto);
    }

    @PutMapping("/{id}")
    public Quote update(@PathVariable Long id, @RequestBody UpdateQuoteDTO dto) {
        return salesService.updateQuote(id, dto);
    }
}