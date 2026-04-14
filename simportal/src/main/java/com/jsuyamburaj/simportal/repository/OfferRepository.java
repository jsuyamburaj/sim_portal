package com.jsuyamburaj.simportal.repository;

import com.jsuyamburaj.simportal.entity.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OfferRepository extends JpaRepository<Offer, Long> {
    List<Offer> findByActiveTrue();
}