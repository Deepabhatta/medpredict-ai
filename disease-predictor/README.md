# 🏥 MedPredict AI — Multiple Disease Predictor

A full-stack AI/ML final year project that predicts **Diabetes**, **Heart Disease**, and **Breast Cancer** using machine learning models with a React frontend and Flask backend.

---

## 🚀 Features

- ✅ **3 Disease Predictions** — Diabetes, Heart Disease, Breast Cancer
- ✅ **ML Models** — Random Forest, Gradient Boosting, SVM
- ✅ **React Frontend** — Modern UI with charts and visualizations
- ✅ **Flask Backend** — REST API with prediction endpoints
- ✅ **PDF Reports** — Downloadable medical reports via ReportLab
- ✅ **Dashboard** — Model accuracy charts and stats
- ✅ **Risk Assessment** — High / Moderate / Low risk levels
- ✅ **Health Tips** — Personalized recommendations

---

## 🧠 ML Models

| Disease | Algorithm | Accuracy | Features |
|---------|-----------|----------|----------|
| Diabetes | Random Forest | 90.91% | 8 |
| Heart Disease | Gradient Boosting | 96.72% | 13 |
| Breast Cancer | SVM | 80.70% | 10 |

---

## 🗂️ Project Structure

```
MedPredict-AI/
├── backend/
│   ├── app.py                  # Main Flask app
│   ├── train_models.py         # ML model training script
│   ├── requirements.txt        # Python dependencies
│   ├── models/                 # Trained .pkl model files
│   └── routes/
│       ├── diabetes.py         # Diabetes prediction API
│       ├── heart.py            # Heart disease prediction API
│       ├── cancer.py           # Breast cancer prediction API
│       └── report.py           # PDF report generation API
├── frontend/
│   ├── src/
│   │   ├── App.jsx             # Main React app with routing
│   │   ├── pages/
│   │   │   ├── Home.jsx        # Landing page
│   │   │   ├── Diabetes.jsx    # Diabetes prediction form
│   │   │   ├── Heart.jsx       # Heart disease form
│   │   │   ├── Cancer.jsx      # Breast cancer form
│   │   │   ├── Results.jsx     # Results with charts + PDF
│   │   │   └── Dashboard.jsx   # Model stats dashboard
│   │   └── components/
│   │       ├── Navbar.jsx      # Navigation bar
│   │       └── PredictForm.jsx # Shared prediction form
│   ├── package.json
│   └── vite.config.js
├── start.bat                   # Windows startup script
├── start.sh                    # Mac/Linux startup script
└── README.md
```

---

## ⚙️ Setup & Run

### Prerequisites
- Python 3.10+
- Node.js 18+

---

### 🪟 Windows — One Click Start

Double-click **`start.bat`**

That's it! Both backend and frontend will start automatically.

---

### 🍎 Mac / Linux — One Click Start

```bash
chmod +x start.sh
./start.sh
```

---

### Manual Setup

#### Step 1 — Backend
```bash
cd backend
pip install -r requirements.txt
python train_models.py
python app.py
```
Backend runs at: http://localhost:5000

#### Step 2 — Frontend (new terminal)
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: http://localhost:5173

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET  | /api/health | Health check |
| POST | /api/predict/diabetes | Predict diabetes |
| POST | /api/predict/heart | Predict heart disease |
| POST | /api/predict/cancer | Predict breast cancer |
| POST | /api/report | Generate PDF report |

---

## 📊 Sample API Request

```json
POST /api/predict/diabetes
{
  "Pregnancies": 2,
  "Glucose": 138,
  "BloodPressure": 72,
  "SkinThickness": 25,
  "Insulin": 120,
  "BMI": 31.5,
  "DiabetesPedigreeFunction": 0.45,
  "Age": 38
}
```

### Response
```json
{
  "prediction": 1,
  "result": "Diabetic",
  "probability": 74.32,
  "risk_level": "High",
  "tips": ["Monitor blood sugar levels regularly", "Maintain a healthy weight"],
  "disease": "Diabetes"
}
```

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, React Router, Recharts, Axios
- **Backend:** Python, Flask, Flask-CORS
- **ML:** Scikit-learn (Random Forest, Gradient Boosting, SVM)
- **PDF:** ReportLab
- **Data:** NumPy, Pandas, Joblib

---

## ⚠️ Disclaimer

This project is for **educational and research purposes only**. It should not be used as a substitute for professional medical advice, diagnosis, or treatment.

---

## 👩‍💻 Author

**Deepa Bhatta** — Final Year AI/ML Project
