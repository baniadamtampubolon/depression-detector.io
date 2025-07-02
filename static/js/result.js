// File: static/js/result.js
// This file contains JavaScript code for the result page of the Depression Assessment web application.
// It handles loading the TensorFlow.js model, processing input data from the URL,
// making predictions, and displaying results with debug logging.
// Ensure TensorFlow.js is loaded 

let model;
let isModelLoaded = false;
let debugLog = [];

// Debug logging function
function addDebugLog(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${type.toUpperCase()}: ${message}`;
    debugLog.push(logEntry);
    
    const debugConsole = document.getElementById('debug-console');
    if (debugConsole) {
        debugConsole.textContent = debugLog.join('\n');
        debugConsole.scrollTop = debugConsole.scrollHeight;
    }
    
    // Also log to browser console
    console.log(logEntry);
}

// Show/hide different states
function showLoading(message = '') {
    document.getElementById('loading-state').classList.remove('hidden');
    document.getElementById('error-state').classList.add('hidden');
    document.getElementById('result-section').classList.add('hidden');
    if (message) {
        document.getElementById('loading-progress').textContent = message;
    }
}

function showError(message = '', errorDetails = '') {
    document.getElementById('loading-state').classList.add('hidden');
    document.getElementById('error-state').classList.remove('hidden');
    document.getElementById('result-section').classList.add('hidden');
    
    if (message) {
        document.getElementById('error-message').textContent = message;
    }
    if (errorDetails) {
        document.getElementById('error-stack').textContent = errorDetails;
    }
}

function showResult() {
    document.getElementById('loading-state').classList.add('hidden');
    document.getElementById('error-state').classList.add('hidden');
    document.getElementById('result-section').classList.remove('hidden');
}

async function loadModel() {
    try {
        addDebugLog("🔄 Memulai loading model...");
        showLoading("Mencari file model...");

        // Check current location
        addDebugLog(`📍 Current URL: ${window.location.href}`);
        addDebugLog(`📍 Current pathname: ${window.location.pathname}`);

        // Model paths to try (adjusted based on your folder structure)
        const possiblePaths = [
            // Dari template/result.html ke model
            'static/model/tfjs_model/model_tfjs.json',
            '../static/model/tfjs_model/model_tfjs.json',
            '/static/model/tfjs_model/model_tfjs.json',
            'static/model/tfjs_model/model_tfjs.json',
            './static/model/tfjs_model/model_tfjs.json',
            // Fallback paths
            '../model/tfjs_model/model_tfjs.json',
            './model/tfjs_model/model_tfjs.json'
        ];

        addDebugLog(`🔍 Akan mencoba ${possiblePaths.length} path berbeda...`);

        let modelLoaded = false;
        let lastError = null;

        for (let i = 0; i < possiblePaths.length; i++) {
            const path = possiblePaths[i];
            try {
                addDebugLog(`📂 Mencoba path ${i + 1}/${possiblePaths.length}: ${path}`);
                showLoading(`Mencoba memuat model... (${i + 1}/${possiblePaths.length})`);

                // Test if file exists first
                const response = await fetch(path, { method: 'HEAD' });
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                addDebugLog(`✅ File ditemukan di: ${path}`);
                showLoading(`Memuat model dari ${path}...`);

                model = await tf.loadLayersModel(path);
                addDebugLog(`✅ Model berhasil dimuat dari: ${path}`);
                
                // Log model info
                addDebugLog(`📊 Model inputs: ${JSON.stringify(model.inputs.map(i => i.shape))}`);
                addDebugLog(`📊 Model outputs: ${JSON.stringify(model.outputs.map(o => o.shape))}`);
                
                modelLoaded = true;
                break;

            } catch (pathError) {
                lastError = pathError;
                addDebugLog(`❌ Gagal dari ${path}: ${pathError.message}`, 'error');
                
                // Special handling for common errors
                if (pathError.message.includes('404')) {
                    addDebugLog(`   → File tidak ditemukan di path ini`, 'warn');
                } else if (pathError.message.includes('CORS')) {
                    addDebugLog(`   → CORS error: pastikan menggunakan web server`, 'warn');
                } else if (pathError.message.includes('Failed to fetch')) {
                    addDebugLog(`   → Network error atau file tidak accessible`, 'warn');
                }
            }
        }

        if (!modelLoaded) {
            const errorMsg = `Model tidak dapat dimuat dari semua path yang dicoba. Last error: ${lastError?.message || 'Unknown error'}`;
            addDebugLog(`💥 ${errorMsg}`, 'error');
            
            // Provide helpful debugging info
            addDebugLog(`🔧 Debugging tips:`, 'warn');
            addDebugLog(`   → Pastikan menjalankan dengan web server (http/https)`, 'warn');
            addDebugLog(`   → Cek apakah file model.json ada di folder static/model/tfjs_model/`, 'warn');
            addDebugLog(`   → Pastikan struktur folder sesuai dengan path yang dicoba`, 'warn');
            
            throw new Error(errorMsg);
        }

        isModelLoaded = true;
        addDebugLog(`🎉 Model loading selesai! Siap untuk prediksi.`);
        return true;

    } catch (error) {
        addDebugLog(`💥 Error dalam loadModel: ${error.message}`, 'error');
        addDebugLog(`📋 Stack trace: ${error.stack}`, 'error');
        throw error;
    }
}

function getInputDataFromQuery() {
    try {
        addDebugLog(`🔍 Mengambil data dari URL parameters...`);
        const params = new URLSearchParams(window.location.search);
        
        addDebugLog(`📋 URL search params: ${params.toString()}`);
        
        if (!params.toString()) {
            throw new Error('Tidak ada data input yang ditemukan. Pastikan Anda mengakses halaman ini melalui form yang benar.');
        }

        const inputData = [];
        const featureOrder = [
            'AGERNG', 'GENDER', 'EDU', 'PROF', 'MARSTS', 'RESDPL', 'LIVWTH',
            'ENVSAT', 'POSSAT', 'FINSTR', 'DEBT', 'PHYEX', 'SMOKE', 'DRINK',
            'ILLNESS', 'PREMED', 'EATDIS', 'AVGSLP', 'INSOM', 'TSSN',
            'WRKPRE', 'ANXI', 'DEPRI', 'ABUSED', 'CHEAT', 'THREAT', 'SUICIDE',
            'INFER', 'CONFLICT', 'LOST'
        ];

        let validParams = 0;
        let paramValues = [];

        featureOrder.forEach((key, index) => {
            const val = params.get(key);
            if (val !== null) {
                validParams++;
                const parsedVal = parseInt(val, 10);
                const finalVal = isNaN(parsedVal) ? 0 : parsedVal;
                inputData.push(finalVal);
                paramValues.push(`${key}: ${finalVal}`);
            } else {
                inputData.push(0);
                paramValues.push(`${key}: 0 (default)`);
            }
        });

        addDebugLog(`📊 Found ${validParams} valid parameters out of ${featureOrder.length}`);
        addDebugLog(`📋 Parameter values: ${paramValues.slice(0, 10).join(', ')}...`);

        if (validParams === 0) {
            throw new Error('Tidak ada parameter yang valid ditemukan dalam URL.');
        }

        addDebugLog(`✅ Input data berhasil diambil: ${inputData.length} features`);
        return inputData;

    } catch (error) {
        addDebugLog(`❌ Error dalam getInputDataFromQuery: ${error.message}`, 'error');
        throw error;
    }
}

async function predictDepression() {
    try {
        addDebugLog(`🤖 Memulai prediksi...`);
        
        if (!isModelLoaded || !model) {
            throw new Error("Model belum dimuat dengan benar");
        }

        const inputData = getInputDataFromQuery();
        addDebugLog(`📊 Input data: [${inputData.slice(0, 5).join(', ')}...] (${inputData.length} total)`);

        showLoading("Membuat prediksi...");

        // Create tensor with correct shape
        addDebugLog(`🔧 Membuat tensor dengan shape [1, 30, 1]...`);
        const reshaped = inputData.map(val => [val]);
        const inputTensor = tf.tensor3d([reshaped], [1, 30, 1]);

        addDebugLog(`✅ Input tensor shape: [${inputTensor.shape.join(', ')}]`);

        // Make prediction
        addDebugLog(`🔮 Menjalankan model.predict()...`);
        const prediction = model.predict(inputTensor);
        const predictionData = await prediction.data();
        const probability = predictionData[0];

        addDebugLog(`📈 Raw prediction: ${probability}`);

        // Clean up tensors
        inputTensor.dispose();
        prediction.dispose();
        addDebugLog(`🧹 Tensors disposed untuk memory management`);

        const predictedClass = probability > 0.5 ? 1 : 0;
        const confidence = Math.max(probability, 1 - probability) * 100;

        addDebugLog(`🎯 Final prediction: Class=${predictedClass}, Probability=${probability.toFixed(4)}, Confidence=${confidence.toFixed(2)}%`);

        displayResult(predictedClass, probability, confidence);
        addDebugLog(`✅ Prediksi selesai dan hasil ditampilkan`);
        
    } catch (error) {
        addDebugLog(`💥 Error dalam predictDepression: ${error.message}`, 'error');
        addDebugLog(`📋 Stack trace: ${error.stack}`, 'error');
        throw error;
    }
}

function displayResult(predictedClass, probability, confidence) {
    const resultText = document.getElementById("result-text");
    const probabilityText = document.getElementById("probability-text");
    const confidencePercentage = document.getElementById("confidence-percentage");
    const confidenceBar = document.getElementById("confidence-bar");
    const resultIcon = document.getElementById("result-icon");
    const recommendations = document.getElementById("recommendations");
    const recommendationContent = document.getElementById("recommendation-content");

    if (predictedClass === 1) {
        resultText.textContent = "Terindikasi Depresi";
        resultText.className = "text-4xl font-bold mb-2 text-red-400";
        resultIcon.textContent = "😔";
        confidenceBar.className = "h-3 rounded-full transition-all duration-500 bg-red-500";
        
        recommendations.classList.remove('hidden');
        recommendationContent.innerHTML = `
            <ul class="text-sm space-y-1">
                <li>• Pertimbangkan untuk berkonsultasi dengan psikolog atau psikiater</li>
                <li>• Jaga pola tidur dan makan yang teratur</li>
                <li>• Lakukan aktivitas fisik ringan secara rutin</li>
                <li>• Terhubung dengan keluarga dan teman-teman terdekat</li>
                <li>• Hindari alkohol dan zat-zat yang dapat memperburuk mood</li>
            </ul>
        `;
    } else {
        resultText.textContent = "Tidak Terindikasi Depresi";
        resultText.className = "text-4xl font-bold mb-2 text-green-400";
        resultIcon.textContent = "😊";
        confidenceBar.className = "h-3 rounded-full transition-all duration-500 bg-green-500";
        
        recommendations.classList.remove('hidden');
        recommendationContent.innerHTML = `
            <ul class="text-sm space-y-1">
                <li>• Terus jaga kesehatan mental dengan baik</li>
                <li>• Lakukan aktivitas yang Anda nikmati secara rutin</li>
                <li>• Pertahankan hubungan sosial yang positif</li>
                <li>• Tetap waspada terhadap perubahan mood atau perasaan</li>
                <li>• Jangan ragu untuk mencari bantuan jika diperlukan</li>
            </ul>
        `;
    }

    probabilityText.textContent = `Skor Probabilitas: ${(probability * 100).toFixed(1)}%`;
    confidencePercentage.textContent = `${confidence.toFixed(1)}%`;
    confidenceBar.style.width = `${confidence}%`;

    showResult();
    addDebugLog(`✅ Hasil ditampilkan: ${predictedClass === 1 ? 'Depresi' : 'Tidak Depresi'} (${confidence.toFixed(1)}% confidence)`);
}

// Event listeners
document.addEventListener('DOMContentLoaded', async function() {
    try {
        addDebugLog(`🚀 Aplikasi dimulai...`);
        addDebugLog(`🌐 TensorFlow.js version: ${tf.version.tfjs}`);
        addDebugLog(`💻 User agent: ${navigator.userAgent}`);
        
        showLoading("Memulai aplikasi...");
        
        await loadModel();
        
        showLoading("Memproses data input...");
        await new Promise(resolve => setTimeout(resolve, 500));
        
        await predictDepression();
        
    } catch (error) {
        addDebugLog(`💥 Application error: ${error.message}`, 'error');
        showError(error.message, error.stack);
    }
});

// Event handlers
document.addEventListener('click', function(e) {
    if (e.target.id === 'toggle-debug') {
        const debugSection = document.getElementById('debug-section');
        const toggleBtn = document.getElementById('toggle-debug');
        
        if (debugSection.classList.contains('hidden')) {
            debugSection.classList.remove('hidden');
            toggleBtn.textContent = 'Hide Debug Info';
        } else {
            debugSection.classList.add('hidden');
            toggleBtn.textContent = 'Show Debug Info';
        }
    } else if (e.target.id === 'clear-debug') {
        debugLog = [];
        document.getElementById('debug-console').textContent = '';
    } else if (e.target.id === 'back-to-form-button' || e.target.id === 'back-to-form-error') {
        window.location.href = '../index.html';
    } else if (e.target.id === 'retry-button') {
        window.location.reload();
    } else if (e.target.id === 'print-result-button') {
        window.print();
    }
});

// Print styles
const printStyles = `
    <style media="print">
        .no-print, #debug-section, #toggle-debug { display: none !important; }
        body { background: white !important; color: black !important; }
        .bg-gray-800, .bg-gray-700 { background: white !important; border: 1px solid #ccc !important; }
        .text-cyan-400 { color: #0891b2 !important; }
        .text-red-400 { color: #dc2626 !important; }
        .text-green-400 { color: #16a34a !important; }
    </style>
`;
document.head.insertAdjacentHTML('beforeend', printStyles);
