#!/bin/bash
echo "================================"
echo " MedPredict AI — Starting Up"
echo "================================"

echo "[1/3] Installing Python dependencies..."
cd backend
pip install -r requirements.txt -q

if [ ! -f "models/diabetes_model.pkl" ]; then
  echo "[2/3] Training ML models (first time only)..."
  python train_models.py
else
  echo "[2/3] Models already trained. Skipping..."
fi

echo "[3/3] Starting Flask backend..."
python app.py &
BACKEND_PID=$!
cd ..

echo "[4/4] Starting React frontend..."
cd frontend
if [ ! -d "node_modules" ]; then
  echo "Installing npm packages..."
  npm install
fi
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "================================"
echo " App is running!"
echo " Frontend: http://localhost:5173"
echo " Backend:  http://localhost:5000"
echo "================================"
echo "Press Ctrl+C to stop all servers"

trap "kill $BACKEND_PID $FRONTEND_PID" EXIT
wait
