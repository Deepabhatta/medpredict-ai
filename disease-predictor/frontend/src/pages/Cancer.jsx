import PredictForm from '../components/PredictForm'

const FIELDS = [
  { key: 'radius_mean',            label: 'Radius Mean',            placeholder: '6-28',   hint: 'Mean of distances from center to perimeter points' },
  { key: 'texture_mean',           label: 'Texture Mean',           placeholder: '9-40',   hint: 'Standard deviation of gray-scale values' },
  { key: 'perimeter_mean',         label: 'Perimeter Mean',         placeholder: '43-188', hint: 'Mean size of core tumor perimeter' },
  { key: 'area_mean',              label: 'Area Mean',              placeholder: '143-2501', hint: 'Mean area of the tumor' },
  { key: 'smoothness_mean',        label: 'Smoothness Mean',        placeholder: '0.05-0.16', hint: 'Mean of local variation in radius lengths' },
  { key: 'compactness_mean',       label: 'Compactness Mean',       placeholder: '0.02-0.35', hint: 'Mean of perimeter² / area - 1.0' },
  { key: 'concavity_mean',         label: 'Concavity Mean',         placeholder: '0-0.43', hint: 'Mean severity of concave portions of contour' },
  { key: 'concave_points_mean',    label: 'Concave Points Mean',    placeholder: '0-0.20', hint: 'Mean number of concave portions of contour' },
  { key: 'symmetry_mean',          label: 'Symmetry Mean',          placeholder: '0.1-0.3', hint: 'Mean symmetry of the tumor' },
  { key: 'fractal_dimension_mean', label: 'Fractal Dimension Mean', placeholder: '0.05-0.10', hint: 'Mean coastline approximation minus 1' },
]

export default function Cancer() {
  return <PredictForm
    title="Breast Cancer Detection"
    icon="🔬"
    color="#8b5cf6"
    bg="#f5f3ff"
    fields={FIELDS}
    endpoint="cancer"
    disease="Breast Cancer"
  />
}
