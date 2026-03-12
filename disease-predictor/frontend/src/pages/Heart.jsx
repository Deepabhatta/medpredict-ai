import PredictForm from '../components/PredictForm'

const FIELDS = [
  { key: 'age',      label: 'Age', unit: 'years', placeholder: '29-77', min: 29, max: 77 },
  { key: 'sex',      label: 'Sex', options: [{ val: '1', label: 'Male' }, { val: '0', label: 'Female' }] },
  { key: 'cp',       label: 'Chest Pain Type', options: [
    { val: '0', label: '0 - Typical Angina' }, { val: '1', label: '1 - Atypical Angina' },
    { val: '2', label: '2 - Non-anginal Pain' }, { val: '3', label: '3 - Asymptomatic' }
  ]},
  { key: 'trestbps', label: 'Resting Blood Pressure', unit: 'mmHg', placeholder: '94-200', min: 94, max: 200 },
  { key: 'chol',     label: 'Serum Cholesterol', unit: 'mg/dL', placeholder: '126-564', min: 126, max: 564 },
  { key: 'fbs',      label: 'Fasting Blood Sugar > 120 mg/dL', options: [
    { val: '1', label: 'True' }, { val: '0', label: 'False' }
  ]},
  { key: 'restecg',  label: 'Resting ECG', options: [
    { val: '0', label: '0 - Normal' }, { val: '1', label: '1 - ST-T Abnormality' },
    { val: '2', label: '2 - Left Ventricular Hypertrophy' }
  ]},
  { key: 'thalach',  label: 'Max Heart Rate', unit: 'bpm', placeholder: '71-202', min: 71, max: 202 },
  { key: 'exang',    label: 'Exercise Induced Angina', options: [
    { val: '1', label: 'Yes' }, { val: '0', label: 'No' }
  ]},
  { key: 'oldpeak',  label: 'ST Depression', placeholder: '0-6.2', min: 0, max: 6.2,
    hint: 'ST depression induced by exercise relative to rest' },
  { key: 'slope',    label: 'Slope of Peak ST', options: [
    { val: '0', label: '0 - Upsloping' }, { val: '1', label: '1 - Flat' }, { val: '2', label: '2 - Downsloping' }
  ]},
  { key: 'ca',       label: 'Major Vessels (Fluoroscopy)', options: [
    { val: '0', label: '0' }, { val: '1', label: '1' }, { val: '2', label: '2' },
    { val: '3', label: '3' }, { val: '4', label: '4' }
  ]},
  { key: 'thal',     label: 'Thalassemia', options: [
    { val: '0', label: '0 - Normal' }, { val: '1', label: '1 - Fixed Defect' },
    { val: '2', label: '2 - Reversible Defect' }, { val: '3', label: '3 - Other' }
  ]},
]

export default function Heart() {
  return <PredictForm
    title="Heart Disease Prediction"
    icon="❤️"
    color="#ef4444"
    bg="#fff5f5"
    fields={FIELDS}
    endpoint="heart"
    disease="Heart Disease"
  />
}
