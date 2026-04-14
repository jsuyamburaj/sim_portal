package com.jsuyamburaj.simportal.entity;

import javax.persistence.*;
import lombok.Data;

@Entity
@Data
public class Sim {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String simNumber;
    private String mobileNumber;
    private String status; // ACTIVE, INACTIVE, BLOCKED
    private String planType; // PREPAID, POSTPAID
}