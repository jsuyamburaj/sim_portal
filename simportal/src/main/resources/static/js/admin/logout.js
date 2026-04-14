// Check admin authentication on page load
if (!sessionStorage.getItem('adminLoggedIn') && window.location.pathname.includes('/admin/')) {
    window.location.href = '/';
}

// Logout functionality
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to logout?')) {
            sessionStorage.removeItem('adminLoggedIn');
            window.location.href = '/';
        }
    });
}

// Display admin name (optional)
const adminNameSpan = document.querySelector('.nav-links span');
if (adminNameSpan && sessionStorage.getItem('adminLoggedIn')) {
    adminNameSpan.textContent = 'Welcome, Admin';
}