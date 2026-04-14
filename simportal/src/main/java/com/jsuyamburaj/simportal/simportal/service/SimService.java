package com.jsuyamburaj.simportal.service;

import com.jsuyamburaj.simportal.entity.Sim;
import com.jsuyamburaj.simportal.repository.SimRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SimService {
    private final SimRepository simRepository;

    public SimService(SimRepository simRepository) {
        this.simRepository = simRepository;
    }

    public List<Sim> getAllSims() {
        return simRepository.findAll();
    }

    public Sim getSimById(Long id) {
        return simRepository.findById(id).orElse(null);
    }

    public Sim saveSim(Sim sim) {
        return simRepository.save(sim);
    }

    public Sim activateSim(Long simId) {
        Sim sim = simRepository.findById(simId).orElse(null);
        if (sim != null) {
            sim.setStatus("ACTIVE");
            return simRepository.save(sim);
        }
        return null;
    }
}