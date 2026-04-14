package com.jsuyamburaj.simportal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ActivationResponse {
    private boolean success;
    private String message;
    private String simNumber;
    private String mobileNumber;
    private String status;
}