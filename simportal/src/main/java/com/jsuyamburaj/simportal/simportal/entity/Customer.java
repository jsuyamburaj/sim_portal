package com.jsuyamburaj.simportal.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String phone;
    
    @OneToOne(cascade = CascadeType.ALL)
    private Address address;
    
    @OneToOne(cascade = CascadeType.ALL)
    private IdProof idProof;
    
    @OneToOne
    private Sim sim;
    
    @ManyToOne
    private Offer selectedOffer;
}