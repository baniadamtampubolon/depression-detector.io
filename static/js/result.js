let model;

async function loadModel() {
  model = await tf.loadLayersModel('static/model/tfjs_model/model_tfjs.json');
  console.log("✅ Model loaded successfully");
}


// Ambil parameter dari URL (kita asumsikan form mengirim melalui query string)
function getInputDataFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const inputData = [];

    // Sesuaikan dengan urutan fitur dari backend kamu
    const featureOrder = [
        'AGERNG', 'GENDER', 'EDU', 'PROF', 'MARSTS', 'RESDPL', 'LIVWTH',
        'ENVSAT', 'POSSAT', 'FINSTR', 'DEBT', 'PHYEX', 'SMOKE', 'DRINK',
        'ILLNESS', 'PREMED', 'EATDIS', 'AVGSLP', 'INSOM', 'TSSN',
        'WRKPRE', 'ANXI', 'DEPRI', 'ABUSED', 'CHEAT', 'THREAT', 'SUICIDE',
        'INFER', 'CONFLICT', 'LOST'
    ];

    featureOrder.forEach(key => {
        const val = parseInt(params.get(key), 10);
        inputData.push(isNaN(val) ? 0 : val); // fallback ke 0 jika tidak valid
    });

    return inputData;
}

async function predictDepression() {
    if (!model) {
        console.warn("Model belum dimuat.");
        return;
    }

    const inputData = getInputDataFromQuery();
    console.log("Data input:", inputData);

    // ✅ Tensor 3D: [batch, timesteps, channels]
    const inputTensor = tf.tensor([inputData], [1, 30, 1]);
    console.log("Input shape:", inputTensor.shape);
    console.log("Model summary:", model.summary?.());



    const prediction = model.predict(inputTensor);
    const predictionData = await prediction.data();
    const probability = predictionData[0];

    const predictedClass = probability > 0.5 ? 1 : 0;

    const resultText = document.getElementById("result-text");
    const probabilityText = document.getElementById("probability-text");

    if (predictedClass === 1) {
        resultText.textContent = "Terindikasi Depresi";
        resultText.className = "text-4xl font-bold mb-2 text-red-400";
    } else {
        resultText.textContent = "Tidak Terindikasi Depresi";
        resultText.className = "text-4xl font-bold mb-2 text-green-400";
    }

    probabilityText.textContent = `Probabilitas dari Model: ${(probability * 100).toFixed(2)}%`;
}


const backButton = document.getElementById("back-to-form-button");
if (backButton) {
    backButton.addEventListener("click", function () {
        window.location.href = "../index.html";
    });
}

// Load model dan jalankan prediksi saat halaman selesai dimuat
window.addEventListener("DOMContentLoaded", async () => {
    await loadModel();
    predictDepression();
});
  