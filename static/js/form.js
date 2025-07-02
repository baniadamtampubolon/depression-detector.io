// File: static/js/form.js
// This file contains JavaScript code for the Depression Assessment form page.
// It handles form submission, randomization of select options, and progress bar animation.
// Ensure TensorFlow.js is loaded

// Progress bar animation
window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    document.querySelector('.progress-bar').style.width = scrolled + '%';
});

// Randomize form function
document.getElementById('randomize-btn').addEventListener('click', function() {
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        const options = select.querySelectorAll('option:not([disabled])');
        const randomIndex = Math.floor(Math.random() * options.length);
        select.value = options[randomIndex].value;
    });
});

// Form submission
document.getElementById('prediction-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Hindari reload

    const formData = new FormData(this);
    const params = new URLSearchParams();

    for (const [key, value] of formData.entries()) {
        params.append(key, value);
    }

    // Arahkan ke result.html dan kirim data sebagai query string
    window.location.href = `result.html?${params.toString()}`;
});
