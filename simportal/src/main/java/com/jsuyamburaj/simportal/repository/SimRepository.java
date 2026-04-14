package com.jsuyamburaj.simportal.repository;

import com.jsuyamburaj.simportal.entity.Sim;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SimRepository extends JpaRepository<Sim, Long> {
    Optional<Sim> findBySimNumber(String simNumber);
    Optional<Sim> findByMobileNumber(String mobileNumber);
}
