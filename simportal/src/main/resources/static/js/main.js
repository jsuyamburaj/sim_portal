// Admin Login Modal
const modal = document.getElementById('adminModal');
const adminBtn = document.getElementById('adminLoginBtn');
const closeBtn = document.querySelector('.close');

adminBtn.onclick = function() {
    modal.style.display = 'block';
}

closeBtn.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Admin Login Handler
document.getElementById('adminLoginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    const result = await callAPI(API.ADMIN_LOGIN, 'POST', { username, password });
    
    if (result.success && result.data.success) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        window.location.href = '/admin/admin-dashboard.html';
    } else {
        document.getElementById('loginError').textContent = 'Invalid credentials';
    }
});

// Feature cards click handlers
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h3').textContent;
        if (title === 'SIM Validation') {
            window.location.href = '/user/sim-validation.html';
        } else if (title === 'Customer Validation') {
            window.location.href = '/user/customer-validation.html';
        } else if (title === 'Address Update') {
            window.location.href = '/user/address.html';
        } else if (title === 'ID Proof Upload') {
            window.location.href = '/user/id-proof.html';
        } else if (title === 'Exclusive Offers') {
            window.location.href = '/user/offers.html';
        } else if (title === 'Status Check') {
            window.location.href = '/user/status.html';
        }
    });
});