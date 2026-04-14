package com.jsuyamburaj.simportal.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Sim {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String simNumber;
    private String iccid;
    private String mobileNumber;
    private String status; // ACTIVE, INACTIVE, BLOCKED
    private String planType;
    private LocalDateTime activationDate;
    
    @PrePersist
    protected void onCreate() {
        status = "INACTIVE";
        activationDate = LocalDateTime.now();
    }
}