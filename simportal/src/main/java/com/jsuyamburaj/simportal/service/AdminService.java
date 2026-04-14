package com.jsuyamburaj.simportal.service;

import com.jsuyamburaj.simportal.entity.Admin;
import com.jsuyamburaj.simportal.repository.AdminRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AdminService {
    private final AdminRepository adminRepository;
    
    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }
    
    public boolean authenticate(String username, String password) {
        Optional<Admin> admin = adminRepository.findByUsernameAndPassword(username, password);
        return admin.isPresent();
    }
    
    // Create default admin if not exists
    public void createDefaultAdmin() {
        if (adminRepository.count() == 0) {
            Admin admin = new Admin();
            admin.setUsername("admin");
            admin.setPassword("admin123");
            admin.setEmail("admin@telecom.com");
            adminRepository.save(admin);
        }
    }
}