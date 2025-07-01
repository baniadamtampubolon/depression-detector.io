// script.js (khusus untuk result.html)

document.addEventListener("DOMContentLoaded", function () {
    const resultPage = document.getElementById("result-page");
    const resultText = document.getElementById("result-text");
    const probabilityText = document.getElementById("probability-text");
    const backToFormButton = document.getElementById("back-to-form-button");

    // Tampilkan result page jika sebelumnya disembunyikan
    if (resultPage) {
        resultPage.classList.remove("hidden");
    }

    // Simulasi hasil prediksi (jika diperlukan)
    // Ini bisa dihapus jika hasil sudah diisi sebelumnya via server atau halaman sebelumnya
    const predictionProbability = 0.72; // Nilai dummy, bisa diganti dari query param atau localStorage
    const predictedClass = predictionProbability > 0.5 ? 1 : 0;

    if (resultText && probabilityText) {
        if (predictedClass === 1) {
            resultText.textContent = "Terindikasi Depresi";
            resultText.className = "text-4xl font-bold mb-2 text-red-400";
        } else {
            resultText.textContent = "Tidak Terindikasi Depresi";
            resultText.className = "text-4xl font-bold mb-2 text-green-400";
        }

        probabilityText.textContent = `Probabilitas dari Model: ${(predictionProbability * 100).toFixed(2)}%`;
    }

    // Event handler tombol kembali
    if (backToFormButton) {
        backToFormButton.addEventListener("click", function () {
            // Redirect ke index.html
            window.location.href = "../index.html"; // Ganti path sesuai struktur kamu
        });
    }
});
