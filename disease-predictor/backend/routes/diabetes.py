from flask import Blueprint, request, jsonify
import joblib, numpy as np, os

diabetes_bp = Blueprint('diabetes', __name__)
BASE = os.path.dirname(os.path.dirname(__file__))
model  = joblib.load(os.path.join(BASE, 'models', 'diabetes_model.pkl'))
scaler = joblib.load(os.path.join(BASE, 'models', 'diabetes_scaler.pkl'))

FEATURES = ['Pregnancies','Glucose','BloodPressure','SkinThickness',
            'Insulin','BMI','DiabetesPedigreeFunction','Age']

@diabetes_bp.route('/predict/diabetes', methods=['POST'])
def predict_diabetes():
    data = request.json
    try:
        vals = np.array([[float(data[f]) for f in FEATURES]])
        vals_s = scaler.transform(vals)
        pred   = model.predict(vals_s)[0]
        prob   = model.predict_proba(vals_s)[0]
        risk   = 'High' if prob[1] > 0.7 else 'Moderate' if prob[1] > 0.4 else 'Low'
        tips = []
        if float(data['Glucose'])  > 140: tips.append('Monitor blood sugar levels regularly')
        if float(data['BMI'])      > 30:  tips.append('Maintain a healthy weight through diet and exercise')
        if float(data['Age'])      > 45:  tips.append('Regular health checkups recommended after 45')
        if float(data['Insulin'])  > 200: tips.append('Consult doctor about insulin levels')
        if not tips: tips.append('Maintain your healthy lifestyle')
        return jsonify({
            'prediction': int(pred),
            'result':     'Diabetic' if pred == 1 else 'Not Diabetic',
            'probability': round(float(prob[1]) * 100, 2),
            'risk_level':  risk,
            'tips':        tips,
            'disease':     'Diabetes'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400
