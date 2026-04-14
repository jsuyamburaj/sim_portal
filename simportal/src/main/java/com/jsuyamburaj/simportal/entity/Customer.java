package com.jsuyamburaj.simportal.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private LocalDate dob;
    private String activationStatus; // PENDING, VERIFIED, ACTIVATED
    
    @OneToOne(cascade = CascadeType.ALL)
    private Address address;
    
    @OneToOne(cascade = CascadeType.ALL)
    private IdProof idProof;
    
    @OneToOne
    private Sim sim;
    
    @ManyToOne
    private Offer selectedOffer;
    
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        activationStatus = "PENDING";
        createdAt = LocalDateTime.now();
    }
}