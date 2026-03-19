// src/main/java/com/carsales/controller/PurchaseRequestController.java
//Nguyen Minh Cao - 12/3/2026
package com.carsales.controller;

import com.carsales.dto.CreateRequestDTO;
import com.carsales.dto.UpdateStatusDTO;
import com.carsales.entity.PurchaseRequest;
import com.carsales.service.SalesService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class PurchaseRequestController {

    private final SalesService salesService;

    @GetMapping
    public List<PurchaseRequest> getAll() {
        return salesService.getAllRequests();
    }

    @PostMapping
    public PurchaseRequest create(@RequestBody CreateRequestDTO dto) {
        return salesService.createRequest(dto);
    }

    @PutMapping("/{id}/status")
    public PurchaseRequest updateStatus(@PathVariable Long id, @RequestBody UpdateStatusDTO dto) {
        return salesService.updateRequestStatus(id, dto.getStatus());
    }
}