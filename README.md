
# 🧠 Mindalayze AI - Depression Assessment Tool

<div align="center">
  <img src="https://img.shields.io/badge/Python-3.12-blue?style=for-the-badge&logo=python&logoColor=white" alt="Python 3.12">
  <img src="https://img.shields.io/badge/TensorFlow-2.x-orange?style=for-the-badge&logo=tensorflow&logoColor=white" alt="TensorFlow">
  <img src="https://img.shields.io/badge/TensorFlow.js-orange?style=for-the-badge&logo=tensorflow&logoColor=white" alt="TensorFlow.js">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
</div>

## 📋 Description

**Mindalayze AI** is an innovative web application that utilizes artificial intelligence to help assess a person's level of depression. It combines machine learning technology with an intuitive web interface to provide an initial evaluation that can assist individuals in understanding their mental state.

> ⚠️ **Disclaimer**: This application is for educational and preliminary screening purposes only. The assessment results do not substitute professional mental health consultation.

### A live preview is available at:
- https://baniadamtampubolon.github.io/depression-detector.io/index.html    

## ✨ Key Features

- 🔍 **Real-time Depression Assessment**: AI-based analysis with instant results
- 🎯 **High Accuracy**: Model trained on a comprehensive dataset
- 📱 **Responsive Design**: Accessible across various devices
- 🎨 **Modern UI/UX**: Clean and user-friendly interface
- 🔒 **Privacy-focused**: Does not store user’s personal data
- ⚡ **Optimized Performance**: Uses TensorFlow.js for fast in-browser inference

## 🛠️ Technology Stack

### Backend & Machine Learning
- **Python 3.12** – Main programming language for modeling
- **TensorFlow** – Framework for building and training AI models
- **Keras** – High-level API for neural networks
- **Jupyter Notebook** – Environment for data preprocessing and model development

### Frontend
- **HTML5** – Markup structure of the website
- **CSS3** – Styling and layout
- **JavaScript (ES6+)** – Interactive logic and communication with model
- **TensorFlow.js** – Runs AI models in the browser
- **Tailwind CSS** – Utility-first CSS framework for modern styling

## 📁 Project Structure

```text
DEPRESSION-ASSESSMENT/
├── notebook/
│   ├── data_preprocess.ipynb       # Training data preprocessing
│   ├── test-model.ipynb            # Model testing and validation
│   └── vis.ipynb                   # Data and result visualization
├── static/
│   ├── css/
│   │   ├── form.css                # Assessment form styling
│   │   ├── result.css              # Result page styling
│   │   └── style.css               # Global styles
│   ├── img/
│   │   └── favicon.png             # Website icon
│   └── js/
│       ├── form.js                 # Form logic and validation
│       ├── result.js               # Displaying assessment results
│       └── script.js               # Main application script
├── model/
│   ├── tfjs_model/                 # TensorFlow.js model files
│   ├── model_tfjs.json             # Model architecture
│   └── model_tfjs.weights.bin      # Model weights
└── template/
    ├── form.html                   # Assessment form page
    └── result.html                 # Assessment result page
```

## 🚀 How to Run

### Prerequisites
Ensure you have:
- Python 3.12+
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/baniadamtampubolon/mindalayze-ai.git
   cd mindalayze-ai
   ```

2. **Set up environment (optional for development)**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   # or
   venv\Scripts\activate     # Windows
   
   pip install -r requirements.txt
   ```

3. **Run the application**

   **Option 1: Using Live Server (Recommended)**
   - Open the project folder in VS Code
   - Install the "Live Server" extension
   - Right-click on `template/form.html` → "Open with Live Server"

   **Option 2: Using Python HTTP Server**
   ```bash
   python -m http.server 8000
   ```
   Then open `http://localhost:8000/template/form.html`

4. **Access the application**
   - Open a browser and navigate to the displayed URL
   - Start the depression assessment

## 🧪 Machine Learning Model

### Dataset
The model was trained on a dataset containing various depression indicators including:
- Psychological symptoms
- Behavioral patterns
- Demographic factors
- Mental health history

### Model Architecture
- **Type**: Neural Network with multiple hidden layers
- **Framework**: TensorFlow/Keras
- **Deployment**: TensorFlow.js for in-browser inference
- **Output Format**: Probability of depression level (0–1)

### Model Performance
- **Accuracy**: [Adjust based on your test results]
- **Precision**: [Adjust based on your test results]
- **Recall**: [Adjust based on your test results]
- **F1-Score**: [Adjust based on your test results]

## 📊 How It Works

1. **Input**: User fills out the assessment questionnaire via the web form
2. **Processing**: Data is sent to a TensorFlow.js model running in the browser
3. **Prediction**: Model analyzes input and produces a depression score
4. **Output**: Result is displayed with interpretation and recommendations

## 🤝 Contribution

Contributions are welcome! Here’s how to contribute:

1. Fork this repository
2. Create a new feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Areas
- 🔧 Bug fixes
- ✨ New features
- 📚 Documentation
- 🎨 UI/UX enhancements
- 🧠 AI model optimization
- 🌐 Internationalization

## ⚖️ Disclaimer

- This application is **NOT** a substitute for professional consultation
- The results are for **preliminary screening** only
- If you are experiencing serious depression symptoms, consult a psychologist or psychiatrist immediately
- The developer is not responsible for any decisions made based on the app's results

## 📞 Contact & Support

- **Developer**: Bani Adam Tampubolon
- **Email**: baniadam.tampubolon@gmail.com
- **GitHub**: github.com/baniadamtampubolon
- **LinkedIn**: linkedin.com/in/adamtampubolon

## 🙏 Acknowledgments

- Mental health professionals who provided insights on depression assessment
- Open source community for tools and libraries
- Dataset providers who enabled model training
- Beta testers who helped improve the application

---

<div align="center">
  <p><strong>Made with ❤️ for better mental health</strong></p>
  <p>⭐ Don’t forget to star this project if you find it helpful!</p>
</div>
