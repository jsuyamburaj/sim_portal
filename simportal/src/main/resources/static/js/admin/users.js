// Load all users
async function loadUsers() {
    if (!requireAdmin()) return;
    
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = '<tr><td colspan="8">Loading users...</td></tr>';
    
    const result = await callAPI(API.ADMIN_USERS, 'GET');
    
    if (result.success && result.data) {
        if (result.data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8">No users found</td></tr>';
            return;
        }
        
        tbody.innerHTML = result.data.map(user => `
            <tr>
                <td>${user.id || '-'}</td>
                <td>${user.firstName || ''} ${user.lastName || ''}</td>
                <td>${user.email || '-'}</td>
                <td>${user.phone || '-'}</td>
                <td>${user.sim?.simNumber || 'Not assigned'}</td>
                <td>${user.selectedOffer?.name || 'No offer'}</td>
                <td><span class="status-badge ${user.activationStatus?.toLowerCase()}">${user.activationStatus || 'PENDING'}</span></td>
                <td>
                    <button class="btn-edit" onclick="editUser(${user.id})">Edit</button>
                    <button class="btn-delete" onclick="deleteUser(${user.id})">Delete</button>
                </td>
            </tr>
        `).join('');
    } else {
        tbody.innerHTML = '<tr><td colspan="8">Error loading users</td></tr>';
    }
}

// Show Add User Modal
function showAddUserModal() {
    currentEditId = null;
    document.getElementById('modalTitle').textContent = 'Add New User';
    document.getElementById('userForm').reset();
    document.getElementById('userModal').style.display = 'block';
    
    // Load offers for dropdown
    loadOffersForDropdown();
}

// Edit User
async function editUser(id) {
    currentEditId = id;
    document.getElementById('modalTitle').textContent = 'Edit User';
    
    const result = await callAPI(`${API.ADMIN_USERS}/${id}`, 'GET');
    
    if (result.success && result.data) {
        const user = result.data;
        document.getElementById('firstName').value = user.firstName || '';
        document.getElementById('lastName').value = user.lastName || '';
        document.getElementById('email').value = user.email || '';
        document.getElementById('phone').value = user.phone || '';
        document.getElementById('dob').value = user.dob || '';
        document.getElementById('simNumber').value = user.sim?.simNumber || '';
        
        if (user.address) {
            document.getElementById('street').value = user.address.street || '';
            document.getElementById('city').value = user.address.city || '';
            document.getElementById('state').value = user.address.state || '';
            document.getElementById('pincode').value = user.address.pincode || '';
            document.getElementById('landmark').value = user.address.landmark || '';
        }
        
        if (user.idProof) {
            document.getElementById('idType').value = user.idProof.type || 'AADHAR';
            document.getElementById('idNumber').value = user.idProof.number || '';
        }
        
        if (user.selectedOffer) {
            document.getElementById('offerId').value = user.selectedOffer.id;
        }
        
        document.getElementById('userModal').style.display = 'block';
    } else {
        alert('Error loading user details');
    }
}

// Delete User
async function deleteUser(id) {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
        const result = await callAPI(`${API.ADMIN_USERS}/${id}`, 'DELETE');
        
        if (result.success) {
            alert('User deleted successfully');
            loadUsers();
        } else {
            alert('Error deleting user: ' + (result.data?.message || 'Unknown error'));
        }
    }
}

// Load offers for dropdown
async function loadOffersForDropdown() {
    const result = await callAPI(API.OFFERS, 'GET');
    
    if (result.success && result.data) {
        const select = document.getElementById('offerId');
        select.innerHTML = '<option value="">No offer</option>' + 
            result.data.map(offer => `<option value="${offer.id}">${offer.name} - ₹${offer.price}</option>`).join('');
    }
}

// Handle form submission
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const userData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                dob: document.getElementById('dob').value,
                simNumber: document.getElementById('simNumber').value,
                offerId: document.getElementById('offerId').value ? parseInt(document.getElementById('offerId').value) : null,
                street: document.getElementById('street').value,
                city: document.getElementById('city').value,
                state: document.getElementById('state').value,
                pincode: document.getElementById('pincode').value,
                landmark: document.getElementById('landmark').value,
                idType: document.getElementById('idType').value,
                idNumber: document.getElementById('idNumber').value
            };
            
            let result;
            if (currentEditId) {
                result = await callAPI(`${API.ADMIN_USERS}/${currentEditId}`, 'PUT', userData);
            } else {
                result = await callAPI(API.ADMIN_USERS, 'POST', userData);
            }
            
            if (result.success) {
                alert(currentEditId ? 'User updated successfully' : 'User created successfully');
                closeModal();
                loadUsers();
            } else {
                alert('Error saving user: ' + (result.data?.message || 'Unknown error'));
            }
        });
    }
});

function closeModal() {
    document.getElementById('userModal').style.display = 'none';
}

// Load users on page load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('usersTableBody')) {
        loadUsers();
    }
});

// Replace the editUser function
function editUser(id) {
    window.location.href = `/admin/edit-user.html?id=${id}`;
}

// Update the deleteUser function
async function deleteUser(id) {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
        const result = await callAPI(`${API.ADMIN_USERS}/${id}`, 'DELETE');
        
        if (result.success) {
            alert('User deleted successfully');
            loadUsers();
        } else {
            alert('Error deleting user: ' + (result.data?.message || 'Unknown error'));
        }
    }
}

// Update the table row generation
tbody.innerHTML = result.data.map(user => `
    <tr>
        <td>${user.id || '-'}</td>
        <td>${user.firstName || ''} ${user.lastName || ''}</td>
        <td>${user.email || '-'}</td>
        <td>${user.phone || '-'}</td>
        <td>${user.sim?.simNumber || 'Not assigned'}</td>
        <td>${user.selectedOffer?.name || 'No offer'}</td>
        <td><span class="status-badge ${user.activationStatus?.toLowerCase()}">${user.activationStatus || 'PENDING'}</span></td>
        <td>
            <button class="btn-edit" onclick="editUser(${user.id})">Edit</button>
            <button class="btn-delete" onclick="deleteUser(${user.id})">Delete</button>
         </td>
    </tr>
`).join('');