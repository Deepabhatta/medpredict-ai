@echo off
title MedPredict AI — Startup
color 0A

echo.
echo  ================================
echo   MedPredict AI — Starting Up
echo  ================================
echo.

echo [1/3] Installing Python dependencies...
cd backend
pip install -r requirements.txt -q
if not exist models\diabetes_model.pkl (
    echo [2/3] Training ML models (first time only)...
    python train_models.py
) else (
    echo [2/3] Models already trained. Skipping...
)

echo [3/3] Starting Flask backend on port 5000...
start "MedPredict Backend" cmd /k python app.py
cd ..

echo [4/4] Installing and starting React frontend...
cd frontend
if not exist node_modules (
    echo Installing npm packages (first time only)...
    npm install
)
start "MedPredict Frontend" cmd /k npm run dev
cd ..

echo.
echo  ================================
echo   App is running!
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:5000
echo  ================================
echo.
pause
