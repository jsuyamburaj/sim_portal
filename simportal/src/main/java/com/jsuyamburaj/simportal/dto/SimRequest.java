package com.jsuyamburaj.simportal.dto;

import lombok.Data;

@Data
public class SimRequest {
    private String simNumber;
    private String iccid;
    private String mobileNumber;
    private String planType; // PREPAID, POSTPAID
}