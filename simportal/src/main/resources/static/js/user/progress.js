// Step configuration for SIM activation
const steps = [
    { name: 'SIM Validation', path: '/user/sim-validation.html' },
    { name: 'Customer Details', path: '/user/customer-validation.html' },
    { name: 'Address', path: '/user/address.html' },
    { name: 'ID Proof', path: '/user/id-proof.html' },
    { name: 'Offers', path: '/user/offers.html' },
    { name: 'Activation', path: '/user/activation-success.html' }
];

// Get current step from URL
function getCurrentStep() {
    const path = window.location.pathname;
    const index = steps.findIndex(step => step.path === path);
    return index !== -1 ? index : 0;
}

// Render progress bar
function renderProgressBar() {
    const currentStep = getCurrentStep();
    const container = document.getElementById('progressContainer');
    if (!container) return;
    
    let html = '<div class="progress-steps">';
    steps.forEach((step, index) => {
        let status = '';
        if (index < currentStep) status = 'completed';
        else if (index === currentStep) status = 'active';
        
        html += `
            <div class="step ${status}">
                ${index + 1}
                <span class="step-label">${step.name}</span>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

// Validate previous steps
function validatePreviousSteps() {
    const currentStep = getCurrentStep();
    
    for (let i = 0; i < currentStep; i++) {
        const stepData = getFromSession(`step_${i}`);
        if (!stepData || !stepData.completed) {
            alert(`Please complete ${steps[i].name} first`);
            window.location.href = steps[i].path;
            return false;
        }
    }
    return true;
}

// Save step data
function saveStepData(stepIndex, data) {
    saveToSession(`step_${stepIndex}`, { ...data, completed: true });
}

// Get all activation data
function getAllActivationData() {
    const data = {};
    steps.forEach((step, index) => {
        const stepData = getFromSession(`step_${index}`);
        if (stepData) {
            Object.assign(data, stepData);
        }
    });
    return data;
}

// Initialize progress bar on page load
document.addEventListener('DOMContentLoaded', () => {
    renderProgressBar();
    
    // Add progress bar to page if not present
    if (!document.getElementById('progressContainer')) {
        const mainContent = document.querySelector('.form-container') || document.body;
        const progressDiv = document.createElement('div');
        progressDiv.id = 'progressContainer';
        progressDiv.className = 'progress-container';
        mainContent.insertBefore(progressDiv, mainContent.firstChild);
        renderProgressBar();
    }
});