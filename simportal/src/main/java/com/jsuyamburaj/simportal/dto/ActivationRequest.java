package com.jsuyamburaj.simportal.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class ActivationRequest {
    // SIM Validation
    private String simNumber;
    private String iccid;
    
    // Customer Validation
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private LocalDate dob;
    
    // Address
    private String street;
    private String city;
    private String state;
    private String pincode;
    private String landmark;
    
    // ID Proof
    private String idType;
    private String idNumber;
    
    // Offer
    private Long offerId;
}