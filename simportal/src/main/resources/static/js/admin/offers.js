let currentEditOfferId = null;

// Load all offers
async function loadOffers() {
    if (!requireAdmin()) return;
    
    const result = await callAPI(API.OFFERS, 'GET');
    
    if (result.success && result.data) {
        const tbody = document.getElementById('offersTableBody');
        
        if (result.data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7">No offers found</td></tr>';
            return;
        }
        
        tbody.innerHTML = result.data.map(offer => `
            <tr>
                <td>${offer.id}</td>
                <td>${offer.name}</td>
                <td>${offer.description || '-'}</td>
                <td>₹${offer.price}</td>
                <td>${offer.dataAmount || '-'}</td>
                <td>${offer.validityDays} days</td>
                <td>
                    <button class="btn-edit" onclick="editOffer(${offer.id})">Edit</button>
                    <button class="btn-delete" onclick="deleteOffer(${offer.id})">Delete</button>
                </td>
            </tr>
        `).join('');
    } else {
        document.getElementById('offersTableBody').innerHTML = '<tr><td colspan="7">Error loading offers</td></tr>';
    }
}

// Show Add Offer Modal
function showAddOfferModal() {
    currentEditOfferId = null;
    document.getElementById('offerModalTitle').textContent = 'Add New Offer';
    document.getElementById('offerForm').reset();
    document.getElementById('offerModal').style.display = 'block';
}

// Edit Offer
async function editOffer(id) {
    currentEditOfferId = id;
    document.getElementById('offerModalTitle').textContent = 'Edit Offer';
    
    const result = await callAPI(`${API.ADMIN_OFFERS}/${id}`, 'GET');
    
    if (result.success && result.data) {
        const offer = result.data;
        document.getElementById('offerName').value = offer.name || '';
        document.getElementById('offerDesc').value = offer.description || '';
        document.getElementById('offerPrice').value = offer.price || '';
        document.getElementById('offerData').value = offer.dataAmount || '';
        document.getElementById('offerValidity').value = offer.validityDays || '';
        document.getElementById('offerModal').style.display = 'block';
    } else {
        alert('Error loading offer details');
    }
}

// Delete Offer
async function deleteOffer(id) {
    if (confirm('Are you sure you want to delete this offer?')) {
        const result = await callAPI(`${API.ADMIN_OFFERS}/${id}`, 'DELETE');
        
        if (result.success) {
            alert('Offer deleted successfully');
            loadOffers();
        } else {
            alert('Error deleting offer');
        }
    }
}

// Handle offer form submission
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('offerForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
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
            if (currentEditOfferId) {
                result = await callAPI(`${API.ADMIN_OFFERS}/${currentEditOfferId}`, 'PUT', offerData);
            } else {
                result = await callAPI(API.ADMIN_OFFERS, 'POST', offerData);
            }
            
            if (result.success) {
                alert(currentEditOfferId ? 'Offer updated successfully' : 'Offer created successfully');
                closeOfferModal();
                loadOffers();
            } else {
                alert('Error saving offer');
            }
        });
    }
});

function closeOfferModal() {
    document.getElementById('offerModal').style.display = 'none';
}

// Load offers on page load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('offersTableBody')) {
        loadOffers();
    }
});

// Update the editOffer function in offers.js
function editOffer(id) {
    window.location.href = `/admin/edit-offer.html?id=${id}`;
}

// Update the deleteOffer function
async function deleteOffer(id) {
    if (confirm('Are you sure you want to delete this offer?')) {
        const result = await callAPI(`${API.ADMIN_OFFERS}/${id}`, 'DELETE');
        
        if (result.success) {
            alert('Offer deleted successfully');
            loadOffers();
        } else {
            alert('Error deleting offer');
        }
    }
}

// Update the table row generation to use buttons that call these functions
tbody.innerHTML = result.data.map(offer => `
    <tr>
        <td>${offer.id}</td>
        <td>${offer.name}</td>
        <td>${offer.description || '-'}</td>
        <td>₹${offer.price}</td>
        <td>${offer.dataAmount || '-'}</td>
        <td>${offer.validityDays} days</td>
        <td>
            <button class="btn-edit" onclick="editOffer(${offer.id})">Edit</button>
            <button class="btn-delete" onclick="deleteOffer(${offer.id})">Delete</button>
        </td>
    </tr>
`).join('');