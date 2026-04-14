// Load offers on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchOffers();
});

// Handle SIM activation form
document.getElementById('activationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const simNumber = document.getElementById('simNumber').value;
    const mobileNumber = document.getElementById('mobileNumber').value;
    const customerName = document.getElementById('customerName').value;
    const email = document.getElementById('email').value;
    
    try {
        // Step 1: Create SIM
        const simResponse = await fetch('/api/sims', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                simNumber: simNumber,
                mobileNumber: mobileNumber,
                status: 'INACTIVE',
                planType: 'PREPAID'
            })
        });
        const sim = await simResponse.json();
        
        // Step 2: Create customer linked to SIM
        const customerResponse = await fetch('/api/customers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: customerName,
                email: email,
                phone: mobileNumber,
                sim: { id: sim.id }
            })
        });
        
        if (customerResponse.ok) {
            document.getElementById('message').innerHTML = '✅ SIM activated successfully!';
            document.getElementById('activationForm').reset();
        } else {
            document.getElementById('message').innerHTML = '❌ Activation failed. Try again.';
        }
    } catch (error) {
        document.getElementById('message').innerHTML = '❌ Error: ' + error.message;
    }
});

// Fetch and display offers
async function fetchOffers() {
    try {
        const response = await fetch('/api/offers');
        const offers = await response.json();
        const list = document.getElementById('offersList');
        list.innerHTML = offers.map(offer => `<li>${offer.name} - ₹${offer.price} (${offer.validityDays} days)</li>`).join('');
    } catch (error) {
        console.error('Error loading offers:', error);
    }
}