document.getElementById('logoutBtn')?.addEventListener('click', () => {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.removeItem('adminLoggedIn');
        window.location.href = '/';
    }
});

// Check admin authentication on page load
if (!sessionStorage.getItem('adminLoggedIn') && window.location.pathname.includes('/admin/')) {
    window.location.href = '/';
}