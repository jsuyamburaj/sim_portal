package com.jsuyamburaj.simportal.dto;

import lombok.Data;

@Data
public class ActivationResponse {
    private String message;
    private boolean success;
    private Long customerId;
    private String simNumber;
    private String mobileNumber;

    public ActivationResponse(String message, boolean success, Long customerId, String simNumber, String mobileNumber) {
        this.message = message;
        this.success = success;
        this.customerId = customerId;
        this.simNumber = simNumber;
        this.mobileNumber = mobileNumber;
    }
}