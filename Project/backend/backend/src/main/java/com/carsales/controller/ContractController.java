// src/main/java/com/carsales/controller/ContractController.java
//Nguyen Minh Cao - 12/3/2026
package com.carsales.controller;

import com.carsales.dto.CreateContractDTO;
import com.carsales.dto.UpdateStatusDTO;
import com.carsales.entity.Contract;
import com.carsales.service.SalesService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contracts")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ContractController {

    private final SalesService salesService;

    @GetMapping
    public List<Contract> getAll() {
        return salesService.getAllContracts();
    }

    @PostMapping
    public Contract create(@RequestBody CreateContractDTO dto) {
        return salesService.createContract(dto);
    }

    @PutMapping("/{id}/status")
    public Contract updateStatus(@PathVariable Long id, @RequestBody UpdateStatusDTO dto) {
        return salesService.updateContractStatus(id, dto.getStatus());
    }
}