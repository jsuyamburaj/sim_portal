package com.jsuyamburaj.simportal.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class IdProof {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type; // AADHAR, PAN, PASSPORT, VOTER_ID
    private String number;
    private String imagePath; // path to uploaded file
}