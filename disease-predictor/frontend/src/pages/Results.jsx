import { useState, useEffect } from 'react'
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts'
import axios from 'axios'

const DISEASE_CONFIG = {
  'Diabetes':      { icon: '🩸', color: '#3b82f6', bg: '#eff6ff' },
  'Heart Disease': { icon: '❤️', color: '#ef4444', bg: '#fff5f5' },
  'Breast Cancer': { icon: '🔬', color: '#8b5cf6', bg: '#f5f3ff' },
}

const RISK_COLORS = { High: '#e53e3e', Moderate: '#d69e2e', Low: '#38a169' }

export default function Results() {
  const [results, setResults]   = useState([])
  const [patient, setPatient]   = useState({ name: '', age: '', sex: 'Male' })
  const [loading, setLoading]   = useState(false)
  const [msg, setMsg]           = useState(null)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('mdp_results') || '[]')
    setResults(saved)
  }, [])

  const downloadPDF = async () => {
    if (!results.length) return
    setLoading(true); setMsg(null)
    try {
      const res = await axios.post('/api/report', {
        results, patientName: patient.name || 'Patient',
        patientAge: patient.age || 'N/A', patientSex: patient.sex
      }, { responseType: 'blob' })
      const url = URL.createObjectURL(res.data)
      const a = document.createElement('a'); a.href = url
      a.download = 'MedPredict_Report.pdf'; a.click()
      URL.revokeObjectURL(url)
      setMsg({ type: 'success', text: 'PDF downloaded successfully!' })
    } catch (e) {
      setMsg({ type: 'error', text: 'PDF generation failed. Make sure backend is running.' })
    }
    setLoading(false)
  }

  const clearResults = () => {
    localStorage.removeItem('mdp_results'); setResults([])
  }

  if (!results.length) return (
    <div style={{ maxWidth: 600, margin: '80px auto', textAlign: 'center', padding: '0 24px' }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>📋</div>
      <h2 style={{ fontFamily: 'Poppins', fontSize: 24, marginBottom: 12 }}>No Results Yet</h2>
      <p style={{ color: 'var(--text-l)', marginBottom: 24 }}>
        Run a prediction first to see your results here.
      </p>
      <a href="/diabetes" style={{
        background: 'var(--primary)', color: 'white', padding: '12px 28px',
        borderRadius: 10, textDecoration: 'none', fontWeight: 600
      }}>Start Predicting →</a>
    </div>
  )

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: 'Poppins', fontSize: 28, fontWeight: 700 }}>Prediction Results</h1>
          <p style={{ color: 'var(--text-l)', fontSize: 14 }}>{results.length} disease(s) analyzed</p>
        </div>
        <button onClick={clearResults} style={{
          background: 'var(--danger-l)', color: 'var(--danger)', border: '1px solid #fed7d7',
          padding: '8px 16px', borderRadius: 8, fontWeight: 600, fontSize: 13
        }}>Clear Results</button>
      </div>

      {/* Result Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: results.length > 1 ? '1fr 1fr' : '1fr', gap: 20, marginBottom: 32 }}>
        {results.map(r => {
          const cfg = DISEASE_CONFIG[r.disease] || { icon: '🔬', color: '#666', bg: '#f9f9f9' }
          const detected = r.prediction === 1
          const chartData = [{ name: r.disease, value: r.probability, fill: cfg.color }]
          const pieData = [
            { name: 'Risk', value: r.probability },
            { name: 'Safe', value: 100 - r.probability }
          ]
          return (
            <div key={r.disease} className="fade-in" style={{
              background: 'var(--white)', borderRadius: 16, overflow: 'hidden',
              boxShadow: 'var(--shadow)', border: `1px solid ${detected ? '#fed7d7' : '#c6f6d5'}`
            }}>
              {/* Top bar */}
              <div style={{
                background: detected ? 'var(--danger)' : 'var(--primary)',
                padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 24 }}>{cfg.icon}</span>
                  <div>
                    <div style={{ color: 'white', fontWeight: 700, fontSize: 15 }}>{r.disease}</div>
                    <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>{r.result}</div>
                  </div>
                </div>
                <div style={{
                  background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: 20,
                  color: 'white', fontSize: 12, fontWeight: 700
                }}>
                  Risk: {r.risk_level}
                </div>
              </div>

              <div style={{ padding: '20px' }}>
                {/* Pie chart */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                  <ResponsiveContainer width={120} height={120}>
                    <PieChart>
                      <Pie data={pieData} cx={55} cy={55} innerRadius={35} outerRadius={55}
                           startAngle={90} endAngle={-270} dataKey="value">
                        <Cell fill={cfg.color} />
                        <Cell fill="#e2e8f0" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div>
                    <div style={{ fontSize: 32, fontWeight: 800, color: cfg.color, fontFamily: 'Poppins' }}>
                      {r.probability}%
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-l)' }}>Probability</div>
                    <div style={{
                      display: 'inline-block', marginTop: 6, padding: '3px 10px', borderRadius: 20,
                      background: detected ? 'var(--danger-l)' : 'var(--primary-l)',
                      color: detected ? 'var(--danger)' : 'var(--primary)',
                      fontSize: 11, fontWeight: 600
                    }}>{detected ? '⚠ Detected' : '✓ Not Detected'}</div>
                  </div>
                </div>

                {/* Tips */}
                {r.tips && (
                  <div style={{ background: 'var(--bg)', borderRadius: 8, padding: '12px' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-m)', marginBottom: 6, letterSpacing: 0.5 }}>
                      RECOMMENDATIONS
                    </div>
                    {r.tips.map((t, i) => (
                      <div key={i} style={{ fontSize: 12, color: 'var(--text-m)', padding: '3px 0',
                                           display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                        <span style={{ color: 'var(--primary)', marginTop: 1 }}>•</span> {t}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* PDF Download Section */}
      <div style={{
        background: 'var(--white)', borderRadius: 16, padding: '28px', boxShadow: 'var(--shadow)',
        border: '1px solid var(--border)'
      }}>
        <h3 style={{ fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, marginBottom: 20 }}>
          📄 Download Medical Report
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
          {[
            { key: 'name', label: 'Patient Name', placeholder: 'Enter name', type: 'text' },
            { key: 'age',  label: 'Age',           placeholder: 'Enter age',  type: 'number' },
          ].map(f => (
            <div key={f.key}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600,
                             color: 'var(--text-m)', marginBottom: 6 }}>{f.label.toUpperCase()}</label>
              <input type={f.type} placeholder={f.placeholder}
                value={patient[f.key]}
                onChange={e => setPatient(p => ({ ...p, [f.key]: e.target.value }))} />
            </div>
          ))}
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600,
                           color: 'var(--text-m)', marginBottom: 6 }}>SEX</label>
            <select value={patient.sex} onChange={e => setPatient(p => ({ ...p, sex: e.target.value }))}>
              <option>Male</option><option>Female</option><option>Other</option>
            </select>
          </div>
        </div>

        {msg && (
          <div style={{
            padding: '10px 14px', borderRadius: 8, marginBottom: 14, fontSize: 13,
            background: msg.type === 'success' ? 'var(--primary-l)' : 'var(--danger-l)',
            color: msg.type === 'success' ? 'var(--primary)' : 'var(--danger)',
            border: `1px solid ${msg.type === 'success' ? '#9ae6b4' : '#fed7d7'}`
          }}>{msg.text}</div>
        )}

        <button onClick={downloadPDF} disabled={loading} style={{
          background: loading ? '#a0aec0' : 'var(--primary)', color: 'white',
          border: 'none', borderRadius: 10, padding: '13px 32px',
          fontWeight: 700, fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'all 0.15s'
        }}>
          {loading ? '⟳ Generating PDF...' : '⬇ Download PDF Report'}
        </button>
      </div>
    </div>
  )
}
