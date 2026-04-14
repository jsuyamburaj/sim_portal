package com.jsuyamburaj.simportal.service;

import com.jsuyamburaj.simportal.entity.Offer;
import com.jsuyamburaj.simportal.repository.OfferRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OfferService {
    private final OfferRepository offerRepository;

    public OfferService(OfferRepository offerRepository) {
        this.offerRepository = offerRepository;
    }

    public List<Offer> getAllOffers() {
        return offerRepository.findAll();
    }

    public Offer getOfferById(Long id) {
        return offerRepository.findById(id).orElse(null);
    }

    public Offer saveOffer(Offer offer) {
        return offerRepository.save(offer);
    }
}