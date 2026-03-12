import { Link } from 'react-router-dom'

const CARDS = [
  { to: '/diabetes',  icon: '🩸', title: 'Diabetes',      color: '#3b82f6', bg: '#eff6ff',
    desc: 'Predict diabetes risk using glucose, BMI, age and other health metrics.',
    model: 'Random Forest', accuracy: '90.91%', features: 8 },
  { to: '/heart',     icon: '❤️', title: 'Heart Disease',  color: '#ef4444', bg: '#fff5f5',
    desc: 'Detect heart disease risk using cholesterol, blood pressure and ECG data.',
    model: 'Gradient Boosting', accuracy: '96.72%', features: 13 },
  { to: '/cancer',    icon: '🔬', title: 'Breast Cancer',  color: '#8b5cf6', bg: '#f5f3ff',
    desc: 'Classify breast cancer tumors as malignant or benign using cell measurements.',
    model: 'SVM', accuracy: '80.70%', features: 10 },
]

const STATS = [
  { val: '3',      label: 'Diseases Covered' },
  { val: '89%+',   label: 'Avg Accuracy' },
  { val: 'Live',   label: 'Real-time Prediction' },
  { val: 'Free',   label: 'Always Free' },
]

export default function Home() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>

      {/* Hero */}
      <div className="fade-in" style={{
        background: 'linear-gradient(135deg, #0ea47a 0%, #0b8562 50%, #065f46 100%)',
        borderRadius: 20, padding: '60px 48px', color: 'white', textAlign: 'center',
        marginBottom: 40, position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.06,
          backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)',
          backgroundSize: '30px 30px' }} />
        <div style={{ fontSize: 56, marginBottom: 16 }}>🏥</div>
        <h1 style={{ fontFamily: 'Poppins', fontSize: 42, fontWeight: 800, marginBottom: 16 }}>
          MedPredict AI
        </h1>
        <p style={{ fontSize: 18, opacity: 0.9, maxWidth: 580, margin: '0 auto 32px' }}>
          Advanced machine learning system to predict Diabetes, Heart Disease, and Breast Cancer
          with high accuracy in seconds.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/diabetes" style={{
            background: 'white', color: '#0ea47a', padding: '13px 32px',
            borderRadius: 10, fontWeight: 700, textDecoration: 'none', fontSize: 15
          }}>Start Prediction</Link>
          <Link to="/dashboard" style={{
            background: 'rgba(255,255,255,0.15)', color: 'white', padding: '13px 32px',
            borderRadius: 10, fontWeight: 600, textDecoration: 'none', fontSize: 15,
            border: '1.5px solid rgba(255,255,255,0.4)'
          }}>View Dashboard</Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 40 }}>
        {STATS.map(s => (
          <div key={s.label} style={{
            background: 'var(--white)', borderRadius: 12, padding: '20px',
            textAlign: 'center', boxShadow: 'var(--shadow)', border: '1px solid var(--border)'
          }}>
            <div style={{ fontFamily: 'Poppins', fontSize: 28, fontWeight: 700, color: 'var(--primary)' }}>{s.val}</div>
            <div style={{ fontSize: 12, color: 'var(--text-l)', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Disease Cards */}
      <h2 style={{ fontFamily: 'Poppins', fontSize: 24, fontWeight: 700, marginBottom: 20, color: 'var(--text)' }}>
        Choose a Prediction
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginBottom: 40 }}>
        {CARDS.map(c => (
          <div key={c.to} className="fade-in" style={{
            background: 'var(--white)', borderRadius: 16, overflow: 'hidden',
            boxShadow: 'var(--shadow)', border: '1px solid var(--border)',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='var(--shadow-lg)' }}
          onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='var(--shadow)' }}>
            <div style={{ background: c.bg, padding: '28px 24px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 8 }}>{c.icon}</div>
              <h3 style={{ fontFamily: 'Poppins', fontSize: 20, fontWeight: 700, color: c.color }}>{c.title}</h3>
            </div>
            <div style={{ padding: '20px 24px' }}>
              <p style={{ fontSize: 13, color: 'var(--text-m)', lineHeight: 1.6, marginBottom: 16 }}>{c.desc}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                {[`Model: ${c.model}`, `Accuracy: ${c.accuracy}`, `${c.features} Features`].map(t => (
                  <span key={t} style={{
                    background: c.bg, color: c.color, fontSize: 11,
                    padding: '3px 10px', borderRadius: 20, fontWeight: 500
                  }}>{t}</span>
                ))}
              </div>
              <Link to={c.to} style={{
                display: 'block', textAlign: 'center', background: c.color, color: 'white',
                padding: '10px', borderRadius: 8, textDecoration: 'none',
                fontWeight: 600, fontSize: 14, transition: 'opacity 0.15s'
              }}>Predict Now →</Link>
            </div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div style={{ background: 'var(--white)', borderRadius: 16, padding: '32px', boxShadow: 'var(--shadow)' }}>
        <h2 style={{ fontFamily: 'Poppins', fontSize: 22, fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>
          How It Works
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
          {[
            { step: '01', icon: '📝', title: 'Enter Data',    desc: 'Fill in your health parameters in the form' },
            { step: '02', icon: '🤖', title: 'AI Analysis',   desc: 'ML model analyzes your data instantly' },
            { step: '03', icon: '📊', title: 'Get Results',   desc: 'View prediction with probability charts' },
            { step: '04', icon: '📄', title: 'Download PDF',  desc: 'Download a detailed medical report' },
          ].map(s => (
            <div key={s.step} style={{ textAlign: 'center' }}>
              <div style={{
                width: 56, height: 56, background: 'var(--primary-l)', borderRadius: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, margin: '0 auto 12px'
              }}>{s.icon}</div>
              <div style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 700, marginBottom: 4 }}>STEP {s.step}</div>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{s.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-l)', lineHeight: 1.5 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
