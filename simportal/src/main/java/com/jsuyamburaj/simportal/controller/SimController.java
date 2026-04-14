package com.jsuyamburaj.simportal.controller;

import com.jsuyamburaj.simportal.service.SimService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/sim")
@CrossOrigin(origins = "*")
public class SimController {
    private final SimService simService;
    
    public SimController(SimService simService) {
        this.simService = simService;
    }
    
    @PostMapping("/validate")
    public ResponseEntity<Map<String, Object>> validateSim(@RequestBody Map<String, String> request) {
        String simNumber = request.get("simNumber");
        boolean isValid = simService.validateSim(simNumber);
        
        Map<String, Object> response = new HashMap<>();
        response.put("valid", isValid);
        response.put("message", isValid ? "SIM is valid and ready for activation" : "Invalid SIM number or already activated");
        
        if (isValid) {
            response.put("simDetails", simService.getSimByNumber(simNumber));
        }
        
        return ResponseEntity.ok(response);
    }
}