// Load TensorFlow.js model
let model;

async function loadModel() {
  const model = await tf.loadLayersModel('/static/model/tfjs_model/model.json');
  console.log("✅ Model loaded successfully");
  return model;
}


// Halaman
const formPage = document.getElementById('form-page');
const resultPage = document.getElementById('result-page');
const predictionForm = document.getElementById('prediction-form');
const backToFormButton = document.getElementById('back-to-form-button');

// Urutan fitur HARUS sesuai dengan saat pelatihan model
const featureOrder = [
    'AGERNG', 'GENDER', 'EDU', 'PROF', 'MARSTS', 'RESDPL', 'LIVWTH',
    'ENVSAT', 'POSSAT', 'FINSTR', 'DEBT', 'PHYEX', 'SMOKE', 'DRINK',
    'ILLNESS', 'PREMED', 'EATDIS', 'AVGSLP', 'INSOM', 'TSSN',
    'WRKPRE', 'ANXI', 'DEPRI', 'ABUSED', 'CHEAT', 'THREAT', 'SUICIDE',
    'INFER', 'CONFLICT', 'LOST'
];

// Saat form disubmit
predictionForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    // Ambil input numerik dari user
    const inputValues = featureOrder.map(id => {
        const element = document.getElementById(id);
        return parseInt(element.value, 10);
    });

    if (!model) {
        alert("Model belum siap. Coba beberapa saat lagi.");
        return;
    }

    // Prediksi menggunakan model TensorFlow.js
    const inputTensor = tf.tensor2d([inputValues]); // shape: [1, 30]
    const prediction = model.predict(inputTensor);
    const predictionArray = await prediction.array();

    const probability = predictionArray[0][0];
    const predictedClass = probability > 0.5 ? 1 : 0;

    // Tampilkan hasil ke UI
    const resultText = document.getElementById('result-text');
    const probabilityText = document.getElementById('probability-text');

    resultText.textContent = predictedClass === 1 ? "Terindikasi Depresi" : "Tidak Terindikasi Depresi";
    resultText.className = predictedClass === 1
        ? "text-4xl font-bold mb-2 text-red-400"
        : "text-4xl font-bold mb-2 text-green-400";

    probabilityText.textContent = `Probabilitas dari Model: ${(probability * 100).toFixed(2)}%`;

    // Navigasi ke halaman hasil
    formPage.classList.add('hidden');
    resultPage.classList.remove('hidden');
    window.scrollTo(0, 0);
});

    // Tombol kembali ke form
    if (backToFormButton && formPage && resultPage) {
        backToFormButton.addEventListener('click', function () {
            resultPage.classList.add('hidden');
            formPage.classList.remove('hidden');

            if (predictionForm) {
                predictionForm.reset();
            }

            window.scrollTo(0, 0);
        });
    }

    // Smooth scroll anchor
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

