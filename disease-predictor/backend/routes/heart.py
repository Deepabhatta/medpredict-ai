from flask import Blueprint, request, jsonify
import joblib, numpy as np, os

heart_bp = Blueprint('heart', __name__)
BASE = os.path.dirname(os.path.dirname(__file__))
model  = joblib.load(os.path.join(BASE, 'models', 'heart_model.pkl'))
scaler = joblib.load(os.path.join(BASE, 'models', 'heart_scaler.pkl'))

FEATURES = ['age','sex','cp','trestbps','chol','fbs','restecg',
            'thalach','exang','oldpeak','slope','ca','thal']

@heart_bp.route('/predict/heart', methods=['POST'])
def predict_heart():
    data = request.json
    try:
        vals   = np.array([[float(data[f]) for f in FEATURES]])
        vals_s = scaler.transform(vals)
        pred   = model.predict(vals_s)[0]
        prob   = model.predict_proba(vals_s)[0]
        risk   = 'High' if prob[1] > 0.7 else 'Moderate' if prob[1] > 0.4 else 'Low'
        tips = []
        if float(data['chol'])    > 240: tips.append('Reduce cholesterol through diet changes')
        if float(data['trestbps'])> 130: tips.append('Monitor and manage blood pressure')
        if float(data['age'])     > 55:  tips.append('Regular cardiac checkups after 55')
        if float(data['fbs'])     == 1:  tips.append('Control fasting blood sugar levels')
        if not tips: tips.append('Keep up your heart-healthy habits')
        return jsonify({
            'prediction': int(pred),
            'result':     'Heart Disease Detected' if pred == 1 else 'No Heart Disease',
            'probability': round(float(prob[1]) * 100, 2),
            'risk_level':  risk,
            'tips':        tips,
            'disease':     'Heart Disease'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400
