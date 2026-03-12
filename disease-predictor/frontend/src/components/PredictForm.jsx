import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function PredictForm({ title, icon, color, bg, fields, endpoint, disease }) {
  const [form, setForm]       = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)
  const navigate = useNavigate()

  const handle = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const submit = async () => {
    for (const f of fields) {
      if (!form[f.key] && form[f.key] !== 0) {
        setError(`Please fill in: ${f.label}`); return
      }
    }
    setError(null); setLoading(true)
    try {
      const res = await axios.post(`/api/predict/${endpoint}`, form)
      const prev = JSON.parse(localStorage.getItem('mdp_results') || '[]')
      const updated = [...prev.filter(r => r.disease !== res.data.disease), {
        ...res.data, inputs: form, timestamp: new Date().toISOString()
      }]
      localStorage.setItem('mdp_results', JSON.stringify(updated))
      navigate('/results')
    } catch (e) {
      setError(e.response?.data?.error || 'Prediction failed. Is the backend running?')
    }
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${color}, ${color}cc)`,
        borderRadius: 16, padding: '32px', color: 'white', marginBottom: 28, textAlign: 'center'
      }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>{icon}</div>
        <h1 style={{ fontFamily: 'Poppins', fontSize: 28, fontWeight: 700 }}>{title}</h1>
        <p style={{ opacity: 0.85, marginTop: 6, fontSize: 14 }}>
          Fill in all fields accurately for best prediction results
        </p>
      </div>

      {/* Form Card */}
      <div style={{
        background: 'var(--white)', borderRadius: 16, padding: '32px',
        boxShadow: 'var(--shadow)', border: '1px solid var(--border)'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px 24px' }}>
          {fields.map(f => (
            <div key={f.key}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600,
                             color: 'var(--text-m)', marginBottom: 6, letterSpacing: 0.5 }}>
                {f.label.toUpperCase()}
                {f.unit && <span style={{ color: 'var(--text-l)', fontWeight: 400 }}> ({f.unit})</span>}
              </label>
              {f.options ? (
                <select value={form[f.key] || ''} onChange={e => handle(f.key, e.target.value)}>
                  <option value="">Select...</option>
                  {f.options.map(o => <option key={o.val} value={o.val}>{o.label}</option>)}
                </select>
              ) : (
                <input
                  type="number" step="any"
                  placeholder={f.placeholder || f.label}
                  min={f.min} max={f.max}
                  value={form[f.key] || ''}
                  onChange={e => handle(f.key, e.target.value)}
                />
              )}
              {f.hint && <div style={{ fontSize: 11, color: 'var(--text-l)', marginTop: 4 }}>{f.hint}</div>}
            </div>
          ))}
        </div>

        {error && (
          <div style={{
            background: 'var(--danger-l)', border: '1px solid #fed7d7', color: 'var(--danger)',
            padding: '12px 16px', borderRadius: 8, marginTop: 20, fontSize: 13
          }}>⚠ {error}</div>
        )}

        <button onClick={submit} disabled={loading} style={{
          width: '100%', marginTop: 24, padding: '14px',
          background: loading ? '#a0aec0' : color, color: 'white',
          border: 'none', borderRadius: 10, fontSize: 16, fontWeight: 700,
          transition: 'all 0.15s', cursor: loading ? 'not-allowed' : 'pointer'
        }}>
          {loading
            ? '⟳ Analyzing...'
            : `🔍 Predict ${disease}`}
        </button>
      </div>

      {/* Disclaimer */}
      <div style={{
        background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: 10,
        padding: '14px 18px', marginTop: 20, fontSize: 12, color: '#92400e'
      }}>
        ⚠️ <strong>Medical Disclaimer:</strong> This tool is for educational purposes only.
        Always consult a licensed medical professional for health decisions.
      </div>
    </div>
  )
}
