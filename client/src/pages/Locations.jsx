// client/src/pages/Locations.jsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllLocations } from '../services/LocationsAPI'
import { Link } from 'react-router-dom'


export default function Locations() {
  const [locations, setLocations] = useState([])
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      try { setLocations(await getAllLocations()) }
      catch (e) { setError(e.message) }
    })()
  }, [])

  if (error) return <p style={{color:'crimson'}}>Error: {error}</p>

  return (
<section style={{ maxWidth: 1200, margin: '32px auto', padding: '0 16px' }}>
  <h2 style={{ marginBottom: 16 }}>Locations</h2>

  {/* ✅ Back to Home button */}
  <Link
    to="/"
    style={{
      display: 'inline-block',
      marginBottom: 16,
      padding: '8px 14px',
      background: '#111',
      color: '#fff',
      borderRadius: 8,
      textDecoration: 'none',
    }}
  >
    ← Back to Home
  </Link>

  {/* Your locations grid */}
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
      gap: 16,
    }}
  >
    {locations.map(loc => (
      <button
        key={loc.id}
        onClick={() => navigate(`/locations/${loc.slug}`)}
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: 14,
          overflow: 'hidden',
          background: '#fff',
          cursor: 'pointer',
          textAlign: 'left',
          padding: 0,
          boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
        }}
      >
        <div style={{ aspectRatio: '16/9', background: '#f3f4f6' }}>
          {loc.image && (
            <img
              src={loc.image}
              alt={loc.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
        </div>
        <div style={{ padding: 12 }}>
          <h3 style={{ margin: '0 0 4px 0' }}>{loc.name}</h3>
          <p style={{ margin: 0, color: '#6b7280' }}>
            /locations/{loc.slug}
          </p>
        </div>
      </button>
    ))}
  </div>
</section>

  )
}
