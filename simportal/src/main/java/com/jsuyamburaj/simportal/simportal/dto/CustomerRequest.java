package com.jsuyamburaj.simportal.dto;

import lombok.Data;

@Data
public class CustomerRequest {
    private String name;
    private String email;
    private String phone;
    private String simNumber;      // linked SIM number
    private Long offerId;          // selected offer ID
    private AddressRequest address;
    private IdProofRequest idProof;

    @Data
    public static class AddressRequest {
        private String street;
        private String city;
        private String state;
        private String pincode;
    }

    @Data
    public static class IdProofRequest {
        private String type;   // AADHAR, PAN, etc.
        private String number;
        // imagePath will be handled via file upload separately
    }
}