// Get page elements
const formPage = document.getElementById('form-page');
const resultPage = document.getElementById('result-page');
const predictionForm = document.getElementById('prediction-form');
const backToFormButton = document.getElementById('back-to-form-button');

// Handle form submission
predictionForm.addEventListener('submit', function(event) {
    // Prevent the form from reloading the page
    event.preventDefault();

    // The feature order must be EXACTLY the same as in your Python script.
    const featureOrder = [
        'AGERNG', 'GENDER', 'EDU', 'PROF', 'MARSTS', 'RESDPL', 'LIVWTH', 
        'ENVSAT', 'POSSAT', 'FINSTR', 'DEBT', 'PHYEX', 'SMOKE', 'DRINK', 
        'ILLNESS', 'PREMED', 'EATDIS', 'AVGSLP', 'INSOM', 'TSSN', 
        'WRKPRE', 'ANXI', 'DEPRI', 'ABUSED', 'CHEAT', 'THREAT', 'SUICIDE', 
        'INFER', 'CONFLICT', 'LOST'
    ];

    // Collect all values from the form in the correct order.
    const numericalInputData = featureOrder.map(featureId => {
        const element = document.getElementById(featureId);
        return parseInt(element.value, 10);
    });
    
    console.log("Input Data Collected:", numericalInputData);

    // --- IMPORTANT: PREDICTION LOGIC (PLACEHOLDER) ---
    const riskFactors = ['FINSTR', 'DEBT', 'ILLNESS', 'PREMED', 'EATDIS', 'INSOM', 'ANXI', 'DEPRI', 'ABUSED', 'CHEAT', 'THREAT', 'SUICIDE', 'INFER', 'CONFLICT', 'LOST'];
    let riskScore = 0;
    numericalInputData.forEach((value, index) => {
        const featureName = featureOrder[index];
        if (riskFactors.includes(featureName) && value === 1) {
            riskScore += 1;
        }
    });
    const predictionProbability = Math.min(0.15 + (riskScore * 0.06), 0.95);
    const predictedClass = predictionProbability > 0.5 ? 1 : 0;
    // --- END OF PLACEHOLDER LOGIC ---

    // Get result elements
    const resultText = document.getElementById('result-text');
    const probabilityText = document.getElementById('probability-text');
    
    // Display the results
    if (predictedClass === 1) {
        resultText.textContent = "Terindikasi Depresi";
        resultText.className = "text-4xl font-bold mb-2 text-red-400";
    } else {
        resultText.textContent = "Tidak Terindikasi Depresi";
        resultText.className = "text-4xl font-bold mb-2 text-green-400";
    }
    probabilityText.textContent = `Probabilitas dari Model: ${(predictionProbability * 100).toFixed(2)}%`;
    
    // Switch to the result page
    formPage.classList.add('hidden');
    resultPage.classList.remove('hidden');
    window.scrollTo(0, 0); // Scroll to top of the new page
});

// Handle clicking the "back" button
backToFormButton.addEventListener('click', function() {
    // Switch back to the form page
    resultPage.classList.add('hidden');
    formPage.classList.remove('hidden');
    window.scrollTo(0, 0); // Scroll to top
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
