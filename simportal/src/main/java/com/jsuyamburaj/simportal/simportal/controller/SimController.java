package com.jsuyamburaj.simportal.controller;

import com.jsuyamburaj.simportal.entity.Sim;
import com.jsuyamburaj.simportal.service.SimService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/sims")
@CrossOrigin(origins = "http://localhost:8080") // Allow frontend
public class SimController {
    private final SimService simService;

    public SimController(SimService simService) {
        this.simService = simService;
    }

    @GetMapping
    public List<Sim> getAllSims() {
        return simService.getAllSims();
    }

    @GetMapping("/{id}")
    public Sim getSimById(@PathVariable Long id) {
        return simService.getSimById(id);
    }

    @PostMapping
    public Sim createSim(@RequestBody Sim sim) {
        return simService.saveSim(sim);
    }

    @PutMapping("/{id}/activate")
    public Sim activateSim(@PathVariable Long id) {
        return simService.activateSim(id);
    }
}