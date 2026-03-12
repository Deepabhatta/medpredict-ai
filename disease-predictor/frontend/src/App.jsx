import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Diabetes from './pages/Diabetes'
import Heart from './pages/Heart'
import Cancer from './pages/Cancer'
import Results from './pages/Results'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/diabetes"  element={<Diabetes />} />
        <Route path="/heart"     element={<Heart />} />
        <Route path="/cancer"    element={<Cancer />} />
        <Route path="/results"   element={<Results />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}
