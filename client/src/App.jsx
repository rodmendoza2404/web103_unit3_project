import { Link } from 'react-router-dom'

export default function App() {
  return (
    <main style={{ fontFamily: 'system-ui, Arial, sans-serif' }}>
      {/* Hero */}
      <section style={{
        padding: '64px 16px',
        background: 'linear-gradient(135deg, #0ea5e9 0%, #22c55e 100%)',
        color: 'white', textAlign: 'center'
      }}>
        <h1 style={{ fontSize: 48, margin: 0 }}>Unity Grid Plaza</h1>
        <p style={{ marginTop: 12, fontSize: 18 }}>Explore events by location—real or imaginary.</p>
        <Link to="/locations" style={{
          display:'inline-block', marginTop: 24, padding: '12px 18px',
          background:'#111', color:'#fff', borderRadius: 10, textDecoration:'none'
        }}>
          Browse Locations →
        </Link>
      </section>

      {/* Callout */}
      <section style={{ maxWidth: 1100, margin: '32px auto', padding: '0 16px', textAlign:'center' }}>
        <h2 style={{ marginBottom: 8 }}>Pick a spot to see what’s happening</h2>
        <p style={{ color:'#555' }}>Each location has its own page and event list.</p>
        <Link to="/locations" style={{ textDecoration:'none' }}>Open locations</Link>
      </section>
    </main>
  )
}
