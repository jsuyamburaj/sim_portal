package com.jsuyamburaj.simportal.controller;

import com.jsuyamburaj.simportal.dto.ActivationRequest;
import com.jsuyamburaj.simportal.entity.Customer;
import com.jsuyamburaj.simportal.service.CustomerService;
import com.jsuyamburaj.simportal.service.SimService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin(origins = "*")
public class CustomerController {
    private final CustomerService customerService;
    private final SimService simService;
    
    public CustomerController(CustomerService customerService, SimService simService) {
        this.customerService = customerService;
        this.simService = simService;
    }
    
    @PostMapping("/validate")
    public ResponseEntity<Map<String, Object>> validateCustomer(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        response.put("valid", true);
        response.put("message", "Customer details validated");
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/save")
    public ResponseEntity<Map<String, Object>> saveCustomer(@RequestBody ActivationRequest request) {
        Customer customer = customerService.saveCustomerDetails(request);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Customer details saved successfully");
        response.put("customerId", customer.getId());
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/status/{simNumber}")
    public ResponseEntity<Map<String, Object>> getStatus(@PathVariable String simNumber) {
        String status = customerService.getActivationStatus(simNumber);
        Customer customer = customerService.getCustomerBySimNumber(simNumber);
        
        Map<String, Object> response = new HashMap<>();
        response.put("status", status);
        response.put("simNumber", simNumber);
        
        if (customer != null && customer.getSim() != null) {
            response.put("mobileNumber", customer.getSim().getMobileNumber());
        }
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/activate/{simId}")
    public ResponseEntity<Map<String, Object>> activate(@PathVariable Long simId) {
        simService.activateSim(simId);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "SIM activated successfully!");
        
        return ResponseEntity.ok(response);
    }
}