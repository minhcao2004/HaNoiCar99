// src/main/java/com/carsales/service/SalesService.java
//Nguyen Minh Cao-HE181251-12/3/2026
package com.carsales.service;

import com.carsales.dto.*;
import com.carsales.entity.*;
import com.carsales.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SalesService {

    private final CustomerRepository customerRepository;
    private final PurchaseRequestRepository requestRepository;
    private final QuoteRepository quoteRepository;
    private final ContractRepository contractRepository;

    public List<PurchaseRequest> getAllRequests() {
        return requestRepository.findAll();
    }

    public PurchaseRequest createRequest(CreateRequestDTO dto) {
        Customer customer = customerRepository.findByPhone(dto.getPhone()).orElseGet(() -> {
            Customer newCustomer = new Customer();
            newCustomer.setName(dto.getCustomerName());
            newCustomer.setPhone(dto.getPhone());
            newCustomer.setEmail(dto.getEmail());
            return customerRepository.save(newCustomer);
        });

        PurchaseRequest request = new PurchaseRequest();
        request.setCustomer(customer);
        request.setRequestDate(LocalDateTime.now());
        request.setStatus("NEW");
        return requestRepository.save(request);
    }

    public PurchaseRequest updateRequestStatus(Long id, String status) {
        PurchaseRequest request = requestRepository.findById(id).orElseThrow();
        request.setStatus(status);
        return requestRepository.save(request);
    }

    public List<Quote> getAllQuotes() {
        return quoteRepository.findAll();
    }

    public Quote createQuote(CreateQuoteDTO dto) {
        PurchaseRequest request = requestRepository.findById(dto.getRequestId()).orElseThrow();
        request.setStatus("QUOTED");
        requestRepository.save(request);

        Quote quote = new Quote();
        quote.setRequest(request);
        quote.setPrice(dto.getPrice());
        quote.setNote(dto.getNote());
        quote.setStatus("ACTIVE");
        return quoteRepository.save(quote);
    }

    public Quote updateQuote(Long id, UpdateQuoteDTO dto) {
        Quote quote = quoteRepository.findById(id).orElseThrow();
        quote.setPrice(dto.getPrice());
        quote.setNote(dto.getNote());
        quote.setStatus(dto.getStatus());

        if ("APPROVED".equalsIgnoreCase(dto.getStatus())) {
            PurchaseRequest request = quote.getRequest();
            request.setStatus("APPROVED");
            requestRepository.save(request);
        }

        return quoteRepository.save(quote);
    }

    public List<Contract> getAllContracts() {
        return contractRepository.findAll();
    }

    public Contract createContract(CreateContractDTO dto) {
        Quote quote = quoteRepository.findById(dto.getQuoteId()).orElseThrow();
        Contract contract = new Contract();
        contract.setQuote(quote);
        contract.setStatus("DRAFT");
        contract.setCreatedAt(LocalDateTime.now());
        return contractRepository.save(contract);
    }

    public Contract updateContractStatus(Long id, String status) {
        Contract contract = contractRepository.findById(id).orElseThrow();
        contract.setStatus(status);
        return contractRepository.save(contract);
    }
}