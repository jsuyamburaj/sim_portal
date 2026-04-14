let selectedOfferId = null;

document.addEventListener('DOMContentLoaded', async () => {
    // Check if previous steps are completed
    const simData = getFromSession('step_0');
    if (!simData || !simData.simValidated) {
        alert('Please complete SIM validation first');
        window.location.href = '/user/sim-validation.html';
        return;
    }
    
    // Load offers
    await loadOffers();
    
    // Load previously selected offer
    const savedOffer = getFromSession('step_4');
    if (savedOffer && savedOffer.offerId) {
        selectedOfferId = savedOffer.offerId;
        highlightSelectedOffer(selectedOfferId);
    }
    
    document.getElementById('confirmBtn').addEventListener('click', async () => {
        if (!selectedOfferId) {
            alert('Please select an offer');
            return;
        }
        
        saveStepData(4, { offerId: selectedOfferId });
        
        // Prepare complete activation data
        const simData = getFromSession('step_0');
        const customerData = getFromSession('step_1');
        const addressData = getFromSession('step_2');
        const idProofData = getFromSession('step_3');
        const offerData = getFromSession('step_4');
        
        const activationData = {
            simNumber: simData.simNumber,
            firstName: customerData.firstName,
            lastName: customerData.lastName,
            email: customerData.email,
            phone: customerData.phone,
            dob: customerData.dob,
            street: addressData.street,
            city: addressData.city,
            state: addressData.state,
            pincode: addressData.pincode,
            landmark: addressData.landmark,
            idType: idProofData.idType,
            idNumber: idProofData.idNumber,
            offerId: offerData.offerId
        };
        
        const result = await callAPI(API.CUSTOMER_SAVE, 'POST', activationData);
        
        if (result.success) {
            // Get the SIM ID and activate
            const simResult = await callAPI(API.SIM_VALIDATE, 'POST', { simNumber: simData.simNumber });
            if (simResult.success && simResult.data.simDetails) {
                await callAPI(`${API.ACTIVATE}/${simResult.data.simDetails.id}`, 'POST');
            }
            
            window.location.href = '/user/activation-success.html';
        } else {
            alert('Activation failed. Please try again.');
        }
    });
});

async function loadOffers() {
    const result = await callAPI(API.OFFERS, 'GET');
    
    if (result.success && result.data) {
        const container = document.getElementById('offersContainer');
        container.innerHTML = result.data.map(offer => `
            <div class="offer-card" data-offer-id="${offer.id}" onclick="selectOffer(${offer.id})">
                <div class="offer-name">${offer.name}</div>
                <div class="offer-price">₹${offer.price}</div>
                <div class="offer-data">📶 ${offer.dataAmount || 'Unlimited Data'}</div>
                <div class="offer-validity">⏱️ ${offer.validityDays} days validity</div>
                <div class="offer-description">${offer.description || ''}</div>
            </div>
        `).join('');
    }
}

function selectOffer(offerId) {
    selectedOfferId = offerId;
    highlightSelectedOffer(offerId);
}

function highlightSelectedOffer(offerId) {
    document.querySelectorAll('.offer-card').forEach(card => {
        if (card.dataset.offerId == offerId) {
            card.classList.add('selected');
        } else {
            card.classList.remove('selected');
        }
    });
}