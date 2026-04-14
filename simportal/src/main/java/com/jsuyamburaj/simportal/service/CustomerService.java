package com.jsuyamburaj.simportal.service;

import com.jsuyamburaj.simportal.dto.ActivationRequest;
import com.jsuyamburaj.simportal.dto.CustomerRequest;
import com.jsuyamburaj.simportal.entity.*;
import com.jsuyamburaj.simportal.exception.CustomException;
import com.jsuyamburaj.simportal.repository.CustomerRepository;
import com.jsuyamburaj.simportal.repository.SimRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class CustomerService {
    private final CustomerRepository customerRepository;
    private final SimRepository simRepository;
    private final OfferService offerService;
    
    public CustomerService(CustomerRepository customerRepository, 
                           SimRepository simRepository,
                           OfferService offerService) {
        this.customerRepository = customerRepository;
        this.simRepository = simRepository;
        this.offerService = offerService;
    }
    
    @Transactional
    public Customer saveCustomerDetails(ActivationRequest request) {
        Customer customer = new Customer();
        customer.setFirstName(request.getFirstName());
        customer.setLastName(request.getLastName());
        customer.setEmail(request.getEmail());
        customer.setPhone(request.getPhone());
        customer.setDob(request.getDob());
        
        // Address
        Address address = new Address();
        address.setStreet(request.getStreet());
        address.setCity(request.getCity());
        address.setState(request.getState());
        address.setPincode(request.getPincode());
        address.setLandmark(request.getLandmark());
        customer.setAddress(address);
        
        // ID Proof
        IdProof idProof = new IdProof();
        idProof.setType(request.getIdType());
        idProof.setNumber(request.getIdNumber());
        customer.setIdProof(idProof);
        
        // SIM
        Sim sim = simRepository.findBySimNumber(request.getSimNumber()).orElse(null);
        customer.setSim(sim);
        
        // Offer
        Offer offer = offerService.getOfferById(request.getOfferId());
        customer.setSelectedOffer(offer);
        customer.setActivationStatus("VERIFIED");
        
        return customerRepository.save(customer);
    }
    
    public Customer getCustomerBySimNumber(String simNumber) {
        return customerRepository.findBySim_SimNumber(simNumber).orElse(null);
    }
    
    public String getActivationStatus(String simNumber) {
        Customer customer = getCustomerBySimNumber(simNumber);
        if (customer == null) return "NOT_FOUND";
        return customer.getActivationStatus();
    }

    // Add these methods to CustomerService.java

public List<Customer> getAllCustomers() {
    return customerRepository.findAll();
}

public Customer getCustomerById(Long id) {
    return customerRepository.findById(id)
        .orElseThrow(() -> new CustomException("Customer not found with id: " + id));
}

public Customer createCustomer(CustomerRequest request) {
    Customer customer = new Customer();
    customer.setFirstName(request.getFirstName());
    customer.setLastName(request.getLastName());
    customer.setEmail(request.getEmail());
    customer.setPhone(request.getPhone());
    customer.setDob(request.getDob());
    customer.setActivationStatus("PENDING");
    
    // Set SIM if provided
    if (request.getSimNumber() != null) {
        Sim sim = simRepository.findBySimNumber(request.getSimNumber()).orElse(null);
        customer.setSim(sim);
    }
    
    // Set Offer if provided
    if (request.getOfferId() != null) {
        Offer offer = offerService.getOfferById(request.getOfferId());
        customer.setSelectedOffer(offer);
    }
    
    // Set Address
    Address address = new Address();
    address.setStreet(request.getStreet());
    address.setCity(request.getCity());
    address.setState(request.getState());
    address.setPincode(request.getPincode());
    address.setLandmark(request.getLandmark());
    customer.setAddress(address);
    
    // Set ID Proof
    IdProof idProof = new IdProof();
    idProof.setType(request.getIdType());
    idProof.setNumber(request.getIdNumber());
    customer.setIdProof(idProof);
    
    return customerRepository.save(customer);
}

public Customer updateCustomer(Long id, CustomerRequest request) {
    Customer customer = getCustomerById(id);
    
    customer.setFirstName(request.getFirstName());
    customer.setLastName(request.getLastName());
    customer.setEmail(request.getEmail());
    customer.setPhone(request.getPhone());
    customer.setDob(request.getDob());
    
    // Update Address
    if (customer.getAddress() == null) {
        customer.setAddress(new Address());
    }
    customer.getAddress().setStreet(request.getStreet());
    customer.getAddress().setCity(request.getCity());
    customer.getAddress().setState(request.getState());
    customer.getAddress().setPincode(request.getPincode());
    customer.getAddress().setLandmark(request.getLandmark());
    
    // Update ID Proof
    if (customer.getIdProof() == null) {
        customer.setIdProof(new IdProof());
    }
    customer.getIdProof().setType(request.getIdType());
    customer.getIdProof().setNumber(request.getIdNumber());
    
    // Update SIM if provided
    if (request.getSimNumber() != null) {
        Sim sim = simRepository.findBySimNumber(request.getSimNumber()).orElse(null);
        customer.setSim(sim);
    }
    
    // Update Offer if provided
    if (request.getOfferId() != null) {
        Offer offer = offerService.getOfferById(request.getOfferId());
        customer.setSelectedOffer(offer);
    }
    
    return customerRepository.save(customer);
}

public void deleteCustomer(Long id) {
    Customer customer = getCustomerById(id);
    customerRepository.delete(customer);
}
}