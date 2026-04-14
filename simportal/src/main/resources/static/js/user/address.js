document.addEventListener('DOMContentLoaded', () => {
    const previousData = getFromSession('step_2');
    if (previousData) {
        document.getElementById('street').value = previousData.street || '';
        document.getElementById('city').value = previousData.city || '';
        document.getElementById('state').value = previousData.state || '';
        document.getElementById('pincode').value = previousData.pincode || '';
        document.getElementById('landmark').value = previousData.landmark || '';
    }
    
    const form = document.getElementById('addressForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const addressData = {
                street: document.getElementById('street').value,
                city: document.getElementById('city').value,
                state: document.getElementById('state').value,
                pincode: document.getElementById('pincode').value,
                landmark: document.getElementById('landmark').value
            };
            
            saveStepData(2, addressData);
            window.location.href = '/user/id-proof.html';
        });
    }
});