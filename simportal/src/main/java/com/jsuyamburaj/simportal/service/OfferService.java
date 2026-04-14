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
        return offerRepository.findByActiveTrue();
    }
    
    public Offer getOfferById(Long id) {
        return offerRepository.findById(id).orElse(null);
    }
    
    public Offer createOffer(Offer offer) {
        return offerRepository.save(offer);
    }
    
    public Offer updateOffer(Long id, Offer offerDetails) {
        Offer offer = getOfferById(id);
        if (offer != null) {
            offer.setName(offerDetails.getName());
            offer.setDescription(offerDetails.getDescription());
            offer.setPrice(offerDetails.getPrice());
            offer.setDataAmount(offerDetails.getDataAmount());
            offer.setValidityDays(offerDetails.getValidityDays());
            return offerRepository.save(offer);
        }
        return null;
    }
    
    public void deleteOffer(Long id) {
        Offer offer = getOfferById(id);
        if (offer != null) {
            offer.setActive(false);
            offerRepository.save(offer);
        }
    }
}