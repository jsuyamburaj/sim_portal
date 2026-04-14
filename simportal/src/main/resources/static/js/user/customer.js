document.addEventListener('DOMContentLoaded', () => {
    // Load previous data if exists
    const previousData = getFromSession('step_1');
    if (previousData) {
        document.getElementById('firstName').value = previousData.firstName || '';
        document.getElementById('lastName').value = previousData.lastName || '';
        document.getElementById('email').value = previousData.email || '';
        document.getElementById('phone').value = previousData.phone || '';
        document.getElementById('dob').value = previousData.dob || '';
    }
    
    const form = document.getElementById('customerForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const customerData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                dob: document.getElementById('dob').value
            };
            
            // Validate all fields
            if (!customerData.firstName || !customerData.lastName || !customerData.email || !customerData.phone || !customerData.dob) {
                alert('Please fill all fields');
                return;
            }
            
            const result = await callAPI(API.CUSTOMER_VALIDATE, 'POST', customerData);
            
            if (result.success) {
                saveStepData(1, customerData);
                window.location.href = '/user/address.html';
            } else {
                alert('Validation failed: ' + (result.data.message || 'Please check your details'));
            }
        });
    }
});