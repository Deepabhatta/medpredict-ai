import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score
import joblib
import os

os.makedirs('models', exist_ok=True)
np.random.seed(42)

# ── 1. DIABETES DATASET (Pima Indians style) ──────────────────────────────────
print("Training Diabetes model...")
n = 768
diabetes_data = pd.DataFrame({
    'Pregnancies':          np.random.randint(0, 17, n),
    'Glucose':              np.random.normal(120, 32, n).clip(0, 200).astype(int),
    'BloodPressure':        np.random.normal(69, 19, n).clip(0, 122).astype(int),
    'SkinThickness':        np.random.normal(20, 16, n).clip(0, 99).astype(int),
    'Insulin':              np.random.normal(79, 115, n).clip(0, 846).astype(int),
    'BMI':                  np.random.normal(32, 7, n).clip(0, 67).round(1),
    'DiabetesPedigreeFunction': np.random.normal(0.47, 0.33, n).clip(0.08, 2.42).round(3),
    'Age':                  np.random.randint(21, 81, n),
})
# Outcome correlated with glucose and BMI
diabetes_data['Outcome'] = (
    (diabetes_data['Glucose'] > 140).astype(int) +
    (diabetes_data['BMI'] > 30).astype(int) +
    (diabetes_data['Age'] > 45).astype(int) +
    (np.random.rand(n) > 0.6).astype(int)
).clip(0, 1)

X_d = diabetes_data.drop('Outcome', axis=1)
y_d = diabetes_data['Outcome']
X_train, X_test, y_train, y_test = train_test_split(X_d, y_d, test_size=0.2)
scaler_d = StandardScaler()
X_train_s = scaler_d.fit_transform(X_train)
X_test_s  = scaler_d.transform(X_test)
model_d = RandomForestClassifier(n_estimators=100, random_state=42)
model_d.fit(X_train_s, y_train)
acc_d = accuracy_score(y_test, model_d.predict(X_test_s))
print(f"  Diabetes Accuracy: {acc_d:.2%}")
joblib.dump(model_d,  'models/diabetes_model.pkl')
joblib.dump(scaler_d, 'models/diabetes_scaler.pkl')

# ── 2. HEART DISEASE DATASET (Cleveland style) ────────────────────────────────
print("Training Heart Disease model...")
n = 303
heart_data = pd.DataFrame({
    'age':       np.random.randint(29, 77, n),
    'sex':       np.random.randint(0, 2, n),
    'cp':        np.random.randint(0, 4, n),
    'trestbps':  np.random.normal(131, 18, n).clip(94, 200).astype(int),
    'chol':      np.random.normal(246, 52, n).clip(126, 564).astype(int),
    'fbs':       np.random.randint(0, 2, n),
    'restecg':   np.random.randint(0, 3, n),
    'thalach':   np.random.normal(150, 23, n).clip(71, 202).astype(int),
    'exang':     np.random.randint(0, 2, n),
    'oldpeak':   np.random.normal(1.0, 1.2, n).clip(0, 6.2).round(1),
    'slope':     np.random.randint(0, 3, n),
    'ca':        np.random.randint(0, 5, n),
    'thal':      np.random.randint(0, 4, n),
})
heart_data['target'] = (
    (heart_data['age'] > 55).astype(int) +
    (heart_data['chol'] > 240).astype(int) +
    (heart_data['thalach'] < 140).astype(int) +
    (np.random.rand(n) > 0.5).astype(int)
).clip(0, 1)

X_h = heart_data.drop('target', axis=1)
y_h = heart_data['target']
X_train, X_test, y_train, y_test = train_test_split(X_h, y_h, test_size=0.2)
scaler_h = StandardScaler()
X_train_s = scaler_h.fit_transform(X_train)
X_test_s  = scaler_h.transform(X_test)
model_h = GradientBoostingClassifier(n_estimators=100, random_state=42)
model_h.fit(X_train_s, y_train)
acc_h = accuracy_score(y_test, model_h.predict(X_test_s))
print(f"  Heart Disease Accuracy: {acc_h:.2%}")
joblib.dump(model_h,  'models/heart_model.pkl')
joblib.dump(scaler_h, 'models/heart_scaler.pkl')

# ── 3. BREAST CANCER DATASET (Wisconsin style) ────────────────────────────────
print("Training Breast Cancer model...")
n = 569
cancer_data = pd.DataFrame({
    'radius_mean':            np.random.normal(14, 3.5, n).clip(6, 28),
    'texture_mean':           np.random.normal(19, 4, n).clip(9, 40),
    'perimeter_mean':         np.random.normal(92, 24, n).clip(43, 188),
    'area_mean':              np.random.normal(655, 352, n).clip(143, 2501),
    'smoothness_mean':        np.random.normal(0.096, 0.014, n).clip(0.05, 0.16),
    'compactness_mean':       np.random.normal(0.104, 0.053, n).clip(0.02, 0.35),
    'concavity_mean':         np.random.normal(0.089, 0.080, n).clip(0, 0.43),
    'concave_points_mean':    np.random.normal(0.049, 0.039, n).clip(0, 0.20),
    'symmetry_mean':          np.random.normal(0.181, 0.027, n).clip(0.1, 0.3),
    'fractal_dimension_mean': np.random.normal(0.063, 0.007, n).clip(0.05, 0.10),
})
cancer_data['diagnosis'] = (
    (cancer_data['radius_mean'] > 15).astype(int) +
    (cancer_data['area_mean'] > 700).astype(int) +
    (np.random.rand(n) > 0.6).astype(int)
).clip(0, 1)

X_c = cancer_data.drop('diagnosis', axis=1)
y_c = cancer_data['diagnosis']
X_train, X_test, y_train, y_test = train_test_split(X_c, y_c, test_size=0.2)
scaler_c = StandardScaler()
X_train_s = scaler_c.fit_transform(X_train)
X_test_s  = scaler_c.transform(X_test)
model_c = SVC(probability=True, random_state=42)
model_c.fit(X_train_s, y_train)
acc_c = accuracy_score(y_test, model_c.predict(X_test_s))
print(f"  Breast Cancer Accuracy: {acc_c:.2%}")
joblib.dump(model_c,  'models/cancer_model.pkl')
joblib.dump(scaler_c, 'models/cancer_scaler.pkl')

print("\n✅ All models trained and saved!")
print(f"  Diabetes:      {acc_d:.2%}")
print(f"  Heart Disease: {acc_h:.2%}")
print(f"  Breast Cancer: {acc_c:.2%}")
