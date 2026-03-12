import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
         RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from 'recharts'

const MODEL_STATS = [
  { disease: 'Diabetes',      model: 'Random Forest', accuracy: 90.91, features: 8,  samples: 768 },
  { disease: 'Heart Disease', model: 'Gradient Boost', accuracy: 96.72, features: 13, samples: 303 },
  { disease: 'Breast Cancer', model: 'SVM',            accuracy: 80.70, features: 10, samples: 569 },
]

const COLORS = ['#3b82f6', '#ef4444', '#8b5cf6']

export default function Dashboard() {
  const [results, setResults] = useState([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('mdp_results') || '[]')
    setResults(saved)
  }, [])

  const radarData = MODEL_STATS.map(m => ({
    subject: m.disease.split(' ')[0],
    Accuracy: m.accuracy, Features: m.features * 7, Samples: m.samples / 10
  }))

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'Poppins', fontSize: 28, fontWeight: 700 }}>Model Dashboard</h1>
        <p style={{ color: 'var(--text-l)', fontSize: 14, marginTop: 4 }}>
          Performance metrics and model statistics
        </p>
      </div>

      {/* Model Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginBottom: 32 }}>
        {MODEL_STATS.map((m, i) => (
          <div key={m.disease} style={{
            background: 'var(--white)', borderRadius: 16, padding: '24px',
            boxShadow: 'var(--shadow)', border: '1px solid var(--border)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 16 }}>{m.disease}</div>
                <div style={{ fontSize: 12, color: 'var(--text-l)', marginTop: 2 }}>{m.model}</div>
              </div>
              <div style={{
                background: '#f0fdf4', color: '#16a34a', padding: '4px 10px',
                borderRadius: 20, fontSize: 12, fontWeight: 700
              }}>{m.accuracy}%</div>
            </div>
            {/* Accuracy bar */}
            <div style={{ background: '#e2e8f0', borderRadius: 4, height: 8, marginBottom: 12 }}>
              <div style={{
                width: `${m.accuracy}%`, height: '100%', borderRadius: 4,
                background: `linear-gradient(90deg, ${COLORS[i]}, ${COLORS[i]}88)`
              }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                { label: 'Features', val: m.features },
                { label: 'Samples',  val: m.samples },
                { label: 'Accuracy', val: m.accuracy + '%' },
                { label: 'Type',     val: 'Classification' },
              ].map(s => (
                <div key={s.label} style={{
                  background: 'var(--bg)', borderRadius: 8, padding: '8px 10px'
                }}>
                  <div style={{ fontSize: 10, color: 'var(--text-l)' }}>{s.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: COLORS[i] }}>{s.val}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
        {/* Accuracy Bar Chart */}
        <div style={{ background: 'var(--white)', borderRadius: 16, padding: '24px', boxShadow: 'var(--shadow)' }}>
          <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 16, marginBottom: 20 }}>
            Model Accuracy Comparison
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MODEL_STATS} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="disease" tick={{ fontSize: 11 }} tickFormatter={v => v.split(' ')[0]} />
              <YAxis domain={[70, 100]} tick={{ fontSize: 11 }} />
              <Tooltip formatter={v => [`${v}%`, 'Accuracy']} />
              <Bar dataKey="accuracy" radius={[6, 6, 0, 0]}>
                {MODEL_STATS.map((_, i) => (
                  <rect key={i} fill={COLORS[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart */}
        <div style={{ background: 'var(--white)', borderRadius: 16, padding: '24px', boxShadow: 'var(--shadow)' }}>
          <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 16, marginBottom: 20 }}>
            Model Characteristics
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
              <PolarRadiusAxis tick={{ fontSize: 9 }} />
              <Radar name="Accuracy" dataKey="Accuracy" stroke="#0ea47a" fill="#0ea47a" fillOpacity={0.3} />
              <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Your Results Summary */}
      {results.length > 0 && (
        <div style={{ background: 'var(--white)', borderRadius: 16, padding: '24px', boxShadow: 'var(--shadow)' }}>
          <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 16, marginBottom: 20 }}>
            Your Latest Predictions
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {results.map(r => (
              <div key={r.disease} style={{
                background: r.prediction === 1 ? '#fff5f5' : '#f0fdf4',
                border: `1px solid ${r.prediction === 1 ? '#fed7d7' : '#bbf7d0'}`,
                borderRadius: 12, padding: '16px'
              }}>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{r.disease}</div>
                <div style={{
                  fontSize: 28, fontWeight: 800, fontFamily: 'Poppins',
                  color: r.prediction === 1 ? 'var(--danger)' : 'var(--primary)'
                }}>{r.probability}%</div>
                <div style={{ fontSize: 12, color: 'var(--text-l)', marginTop: 2 }}>{r.result}</div>
                <div style={{
                  marginTop: 8, display: 'inline-block', padding: '2px 10px', borderRadius: 20, fontSize: 11,
                  background: r.risk_level === 'High' ? '#fff5f5' : r.risk_level === 'Moderate' ? '#fffff0' : '#f0fdf4',
                  color: r.risk_level === 'High' ? '#e53e3e' : r.risk_level === 'Moderate' ? '#d69e2e' : '#38a169',
                  fontWeight: 600
                }}>Risk: {r.risk_level}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tech Stack */}
      <div style={{ background: 'var(--white)', borderRadius: 16, padding: '24px', boxShadow: 'var(--shadow)', marginTop: 24 }}>
        <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 16, marginBottom: 20 }}>Technology Stack</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
          {[
            { icon: '⚛️', name: 'React 18',          cat: 'Frontend' },
            { icon: '🐍', name: 'Flask',              cat: 'Backend' },
            { icon: '🤖', name: 'Scikit-learn',       cat: 'ML Models' },
            { icon: '📊', name: 'Recharts',           cat: 'Visualization' },
            { icon: '🌲', name: 'Random Forest',      cat: 'Diabetes Model' },
            { icon: '📈', name: 'Gradient Boosting',  cat: 'Heart Model' },
            { icon: '⚡', name: 'SVM',                cat: 'Cancer Model' },
            { icon: '📄', name: 'ReportLab',          cat: 'PDF Reports' },
          ].map(t => (
            <div key={t.name} style={{
              background: 'var(--bg)', borderRadius: 10, padding: '14px', textAlign: 'center'
            }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{t.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{t.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-l)', marginTop: 2 }}>{t.cat}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
