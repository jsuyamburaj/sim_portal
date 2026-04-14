// API Base URL
const API_BASE_URL = 'http://localhost:8080/api';

// API Endpoints
const API = {
    SIM_VALIDATE: `${API_BASE_URL}/sim/validate`,
    CUSTOMER_VALIDATE: `${API_BASE_URL}/customer/validate`,
    CUSTOMER_SAVE: `${API_BASE_URL}/customer/save`,
    OFFERS: `${API_BASE_URL}/offers`,
    ACTIVATE: `${API_BASE_URL}/customer/activate`,
    STATUS: (simNumber) => `${API_BASE_URL}/customer/status/${simNumber}`,
    ADMIN_LOGIN: `${API_BASE_URL}/admin/login`,
    ADMIN_STATS: `${API_BASE_URL}/admin/stats`,
    ADMIN_OFFERS: `${API_BASE_URL}/offers`,
    ADMIN_USERS: `${API_BASE_URL}/admin/users`
};

// Helper function for API calls
async function callAPI(url, method = 'GET', data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    if (data) {
        options.body = JSON.stringify(data);
    }
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return { success: response.ok, data: result };
    } catch (error) {
        console.error('API Error:', error);
        return { success: false, error: error.message };
    }
}

// Session storage helpers
function saveToSession(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
}

function getFromSession(key) {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

function clearSession() {
    sessionStorage.clear();
}