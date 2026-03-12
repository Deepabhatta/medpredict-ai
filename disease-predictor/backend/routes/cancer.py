from flask import Blueprint, request, jsonify
import joblib, numpy as np, os

cancer_bp = Blueprint('cancer', __name__)
BASE = os.path.dirname(os.path.dirname(__file__))
model  = joblib.load(os.path.join(BASE, 'models', 'cancer_model.pkl'))
scaler = joblib.load(os.path.join(BASE, 'models', 'cancer_scaler.pkl'))

FEATURES = ['radius_mean','texture_mean','perimeter_mean','area_mean',
            'smoothness_mean','compactness_mean','concavity_mean',
            'concave_points_mean','symmetry_mean','fractal_dimension_mean']

@cancer_bp.route('/predict/cancer', methods=['POST'])
def predict_cancer():
    data = request.json
    try:
        vals   = np.array([[float(data[f]) for f in FEATURES]])
        vals_s = scaler.transform(vals)
        pred   = model.predict(vals_s)[0]
        prob   = model.predict_proba(vals_s)[0]
        risk   = 'High' if prob[1] > 0.7 else 'Moderate' if prob[1] > 0.4 else 'Low'
        tips = []
        if float(data['radius_mean']) > 15: tips.append('Immediate medical consultation recommended')
        if float(data['area_mean'])   > 700: tips.append('Regular mammography screening advised')
        tips.append('Early detection significantly improves outcomes')
        tips.append('Consult an oncologist for detailed analysis')
        return jsonify({
            'prediction': int(pred),
            'result':     'Malignant (Cancer Detected)' if pred == 1 else 'Benign (No Cancer)',
            'probability': round(float(prob[1]) * 100, 2),
            'risk_level':  risk,
            'tips':        tips,
            'disease':     'Breast Cancer'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400
