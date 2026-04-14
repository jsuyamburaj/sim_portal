// Check admin authentication
if (!sessionStorage.getItem('adminLoggedIn')) {
    window.location.href = '/';
}

// Load dashboard stats
async function loadStats() {
    const result = await callAPI(API.ADMIN_STATS, 'GET');
    if (result.success) {
        document.getElementById('totalCustomers').textContent = result.data.totalCustomers || 0;
        document.getElementById('totalOffers').textContent = result.data.totalOffers || 0;
        document.getElementById('activeActivations').textContent = result.data.activeActivations || 0;
    }
}

loadStats();