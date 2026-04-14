package com.jsuyamburaj.simportal;

import com.jsuyamburaj.simportal.service.AdminService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SimActivationApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(SimActivationApplication.class, args);
    }
    
    @Bean
    public CommandLineRunner initData(AdminService adminService) {
        return args -> {
            adminService.createDefaultAdmin();
            System.out.println("Application started with default admin: admin/admin123");
        };
    }
}