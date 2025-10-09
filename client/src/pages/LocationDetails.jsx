import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getEventsByLocationSlug } from '../services/EventsAPI'
import { getLocationBySlug } from '../services/LocationsAPI'
import Event from '../components/Event'

function formatCountdown(startsAt) {
  const now = new Date()
  const start = new Date(startsAt)
  const diffMs = start - now
  const past = diffMs < 0
  const abs = Math.abs(diffMs)
  const days = Math.floor(abs / (1000 * 60 * 60 * 24))
  const hours = Math.floor((abs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const mins = Math.floor((abs % (1000 * 60 * 60)) / (1000 * 60))
  return { past, label: `${past ? '-' : ''}${days}d ${hours}h ${mins}m` }
}

export default function LocationDetails() {
  const { slug } = useParams()
  const [location, setLocation] = useState(null)
  const [events, setEvents] = useState([])
  const [error, setError] = useState(null)
  const [sort, setSort] = useState('soonest') // stretch-ready

  useEffect(() => {
    (async () => {
      try {
        const [loc, evts] = await Promise.all([
          getLocationBySlug(slug),
          getEventsByLocationSlug(slug)
        ])
        setLocation(loc)
        setEvents(evts)
      } catch (e) {
        setError(e.message)
      }
    })()
  }, [slug])

  const sorted = useMemo(() => {
    const copy = [...events]
    if (sort === 'soonest') copy.sort((a,b) => new Date(a.startsAt) - new Date(b.startsAt))
    if (sort === 'latest') copy.sort((a,b) => new Date(b.startsAt) - new Date(a.startsAt))
    return copy
  }, [events, sort])

  if (error) return <p style={{ color: 'crimson' }}>Error: {error}</p>
  if (!location) return <p>Loading…</p>

  return (
    <section style={{ maxWidth: 960, margin: '2rem auto', padding: '1rem' }}>
      <Link
  to="/locations"
  style={{
    display: 'inline-block',
    marginBottom: 16,
    padding: '8px 14px',
    background: '#111',
    color: '#fff',
    borderRadius: 8,
    textDecoration: 'none',
    fontWeight: 500,
    transition: 'background 0.2s ease-in-out',
  }}
  onMouseEnter={e => (e.target.style.background = '#333')}
  onMouseLeave={e => (e.target.style.background = '#111')}
>
  ← All Locations
</Link>


      <header style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 12 }}>
        {location.image && (
          <img
            src={location.image}
            alt={location.name}
            style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 8 }}
          />
        )}
        <div>
          <h2 style={{ margin: 0 }}>{location.name}</h2>
          <small style={{ color: '#666' }}>/locations/{location.slug}</small>
        </div>
      </header>

      {/* Stretch: sort control */}
      <div style={{ marginTop: 16 }}>
        <label>
          Sort:{' '}
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="soonest">Soonest</option>
            <option value="latest">Latest</option>
          </select>
        </label>
      </div>

      <ul style={{ padding: 0, marginTop: 16, display: 'grid', gap: 12 }}>
        {sorted.map(evt => (
          <Event key={evt.id} event={evt} showLocation={false} />
        ))}
      </ul>

      {!sorted.length && <p>No events yet for this location.</p>}
    </section>
  )
}