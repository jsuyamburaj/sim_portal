document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('simForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const simNumber = document.getElementById('simNumber').value;
            
            const result = await callAPI(API.SIM_VALIDATE, 'POST', { simNumber });
            
            if (result.success && result.data.valid) {
                saveStepData(0, { simNumber, simValidated: true });
                window.location.href = '/user/customer-validation.html';
            } else {
                alert(result.data.message || 'Invalid SIM number');
            }
        });
    }
});