import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const LINKS = [
  { to: '/',          label: 'Home' },
  { to: '/diabetes',  label: 'Diabetes' },
  { to: '/heart',     label: 'Heart Disease' },
  { to: '/cancer',    label: 'Breast Cancer' },
  { to: '/dashboard', label: 'Dashboard' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <nav style={{
      background: 'var(--white)', borderBottom: '1px solid var(--border)',
      position: 'sticky', top: 0, zIndex: 100,
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, background: 'linear-gradient(135deg, #0ea47a, #0b8562)',
            borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18
          }}>🏥</div>
          <div>
            <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: 18, color: 'var(--primary)' }}>
              MedPredict<span style={{ color: 'var(--text)' }}> AI</span>
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-l)', letterSpacing: 1 }}>DISEASE PREDICTOR</div>
          </div>
        </Link>

        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {LINKS.map(l => (
            <Link key={l.to} to={l.to} style={{
              textDecoration: 'none', padding: '7px 14px', borderRadius: 8,
              fontSize: 13, fontWeight: 500,
              background: pathname === l.to ? 'var(--primary-l)' : 'transparent',
              color: pathname === l.to ? 'var(--primary)' : 'var(--text-m)',
              transition: 'all 0.15s'
            }}>{l.label}</Link>
          ))}
          <Link to="/results" style={{
            textDecoration: 'none', padding: '8px 18px', borderRadius: 8,
            background: 'var(--primary)', color: 'white', fontSize: 13, fontWeight: 600,
            marginLeft: 8, transition: 'all 0.15s'
          }}>View Results</Link>
        </div>
      </div>
    </nav>
  )
}
