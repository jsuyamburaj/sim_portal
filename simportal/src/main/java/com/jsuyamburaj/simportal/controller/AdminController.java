package com.jsuyamburaj.simportal.controller;

import com.jsuyamburaj.simportal.dto.CustomerRequest;
import com.jsuyamburaj.simportal.dto.LoginRequest;
import com.jsuyamburaj.simportal.entity.Customer;
import com.jsuyamburaj.simportal.exception.CustomException;
import com.jsuyamburaj.simportal.service.AdminService;
import com.jsuyamburaj.simportal.service.CustomerService;
import com.jsuyamburaj.simportal.service.OfferService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {
    private final AdminService adminService;
    private final CustomerService customerService;
    private final OfferService offerService;
    
    public AdminController(AdminService adminService, CustomerService customerService, OfferService offerService) {
        this.adminService = adminService;
        this.customerService = customerService;
        this.offerService = offerService;
    }
    
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest request) {
        boolean authenticated = adminService.authenticate(request.getUsername(), request.getPassword());
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", authenticated);
        response.put("message", authenticated ? "Login successful" : "Invalid credentials");
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalCustomers", 0); // You can implement actual count
        stats.put("totalOffers", offerService.getAllOffers().size());
        stats.put("activeActivations", 0);
        
        return ResponseEntity.ok(stats);
    }

    // Add these methods to AdminController.java

@GetMapping("/users")
public ResponseEntity<List<Customer>> getAllUsers() {
    List<Customer> users = customerService.getAllCustomers();
    return ResponseEntity.ok(users);
}

@GetMapping("/users/{id}")
public ResponseEntity<Customer> getUserById(@PathVariable Long id) {
    Customer user = customerService.getCustomerById(id);
    if (user != null) {
        return ResponseEntity.ok(user);
    }
    throw new CustomException("User not found with id: " + id);
}

@PostMapping("/users")
public ResponseEntity<Customer> createUser(@RequestBody CustomerRequest customerRequest) {
    Customer customer = customerService.createCustomer(customerRequest);
    return ResponseEntity.status(HttpStatus.CREATED).body(customer);
}

@PutMapping("/users/{id}")
public ResponseEntity<Customer> updateUser(@PathVariable Long id, @RequestBody CustomerRequest customerRequest) {
    Customer updatedUser = customerService.updateCustomer(id, customerRequest);
    return ResponseEntity.ok(updatedUser);
}

@DeleteMapping("/users/{id}")
public ResponseEntity<Map<String, String>> deleteUser(@PathVariable Long id) {
    customerService.deleteCustomer(id);
    Map<String, String> response = new HashMap<>();
    response.put("message", "User deleted successfully");
    return ResponseEntity.ok(response);
}
}