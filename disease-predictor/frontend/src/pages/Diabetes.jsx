import PredictForm from '../components/PredictForm'

const FIELDS = [
  { key: 'Pregnancies', label: 'Pregnancies', placeholder: '0-17', min: 0, max: 17,
    hint: 'Number of times pregnant' },
  { key: 'Glucose', label: 'Glucose', unit: 'mg/dL', placeholder: '0-200', min: 0, max: 200,
    hint: 'Plasma glucose concentration (2hr oral glucose tolerance test)' },
  { key: 'BloodPressure', label: 'Blood Pressure', unit: 'mmHg', placeholder: '0-122', min: 0, max: 122,
    hint: 'Diastolic blood pressure' },
  { key: 'SkinThickness', label: 'Skin Thickness', unit: 'mm', placeholder: '0-99', min: 0, max: 99,
    hint: 'Triceps skin fold thickness' },
  { key: 'Insulin', label: 'Insulin', unit: 'μU/mL', placeholder: '0-846', min: 0, max: 846,
    hint: '2-hour serum insulin' },
  { key: 'BMI', label: 'BMI', unit: 'kg/m²', placeholder: '0-67', min: 0, max: 67,
    hint: 'Body mass index (weight in kg / height in m²)' },
  { key: 'DiabetesPedigreeFunction', label: 'Diabetes Pedigree', placeholder: '0.08-2.42',
    hint: 'Diabetes pedigree function (genetic influence)' },
  { key: 'Age', label: 'Age', unit: 'years', placeholder: '21-80', min: 21, max: 80 },
]

export default function Diabetes() {
  return <PredictForm
    title="Diabetes Prediction"
    icon="🩸"
    color="#3b82f6"
    bg="#eff6ff"
    fields={FIELDS}
    endpoint="diabetes"
    disease="Diabetes"
  />
}
