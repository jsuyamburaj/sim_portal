let currentEditId = null;

document.addEventListener('DOMContentLoaded', () => {
    loadOffers();
    
    document.getElementById('offerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const offerData = {
            name: document.getElementById('offerName').value,
            description: document.getElementById('offerDesc').value,
            price: parseFloat(document.getElementById('offerPrice').value),
            dataAmount: document.getElementById('offerData').value,
            validityDays: parseInt(document.getElementById('offerValidity').value),
            active: true
        };
        
        let result;
        if (currentEditId) {
            result = await callAPI(`${API.ADMIN_OFFERS}/${currentEditId}`, 'PUT', offerData);
        } else {
            result = await callAPI(API.ADMIN_OFFERS, 'POST', offerData);
        }
        
        if (result.success) {
            closeModal();
            loadOffers();
        } else {
            alert('Failed to save offer');
        }
    });
});

async function loadOffers() {
    const result = await callAPI(API.OFFERS, 'GET');
    if (result.success && result.data) {
        const tbody = document.getElementById('offersTableBody');
        tbody.innerHTML = result.data.map(offer => `
            <tr>
                <td>${offer.id}</td>
                <td>${offer.name}</td>
                <td>₹${offer.price}</td>
                <td>${offer.dataAmount || '-'}</td>
                <td>${offer.validityDays} days</td>
                <td>
                    <button class="btn-edit" onclick="editOffer(${offer.id})">Edit</button>
                    <button class="btn-delete" onclick="deleteOffer(${offer.id})">Delete</button>
                </td>
            </tr>
        `).join('');
    }
}

function showAddOfferModal() {
    currentEditId = null;
    document.getElementById('modalTitle').textContent = 'Add Offer';
    document.getElementById('offerForm').reset();
    document.getElementById('offerModal').style.display = 'block';
}

function editOffer(id) {
    currentEditId = id;
    // Fetch offer details and populate form
    callAPI(`${API.ADMIN_OFFERS}/${id}`, 'GET').then(result => {
        if (result.success && result.data) {
            document.getElementById('modalTitle').textContent = 'Edit Offer';
            document.getElementById('offerName').value = result.data.name;
            document.getElementById('offerDesc').value = result.data.description || '';
            document.getElementById('offerPrice').value = result.data.price;
            document.getElementById('offerData').value = result.data.dataAmount || '';
            document.getElementById('offerValidity').value = result.data.validityDays;
            document.getElementById('offerModal').style.display = 'block';
        }
    });
}

async function deleteOffer(id) {
    if (confirm('Are you sure you want to delete this offer?')) {
        const result = await callAPI(`${API.ADMIN_OFFERS}/${id}`, 'DELETE');
        if (result.success) {
            loadOffers();
        } else {
            alert('Failed to delete offer');
        }
    }
}

function closeModal() {
    document.getElementById('offerModal').style.display = 'none';
}