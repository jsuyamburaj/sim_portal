document.addEventListener('DOMContentLoaded', () => {
    const previousData = getFromSession('step_3');
    if (previousData) {
        document.getElementById('idType').value = previousData.idType || 'AADHAR';
        document.getElementById('idNumber').value = previousData.idNumber || '';
    }
    
    const form = document.getElementById('idProofForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const idProofData = {
                idType: document.getElementById('idType').value,
                idNumber: document.getElementById('idNumber').value
            };
            
            saveStepData(3, idProofData);
            window.location.href = '/user/offers.html';
        });
    }
});