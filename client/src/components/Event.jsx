import { Link } from 'react-router-dom'

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

export default function Event({ event, showLocation = false, compact = false }) {
  if (!event) return null

  const { past, label } = formatCountdown(event.startsAt)
  const padding = compact ? 10 : 12

  return (
    <li
      style={{
        border: '1px solid #eee',
        borderRadius: 10,
        padding,
        background: past ? '#fafafa' : '#fff',
        opacity: past ? 0.75 : 1,
        listStyle: 'none'
      }}
    >
      <h3 style={{ margin: 0 }}>
        {event.title}{' '}
        {past && <span style={{ color: '#ef4444' }}>(passed)</span>}
      </h3>

      {showLocation && event.locationName && event.slug && (
        <p style={{ margin: '6px 0 0', color: '#666' }}>
          At{' '}
          <Link to={`/locations/${event.slug}`}>
            {event.locationName}
          </Link>
        </p>
      )}

      {event.description && (
        <p style={{ margin: '6px 0 0' }}>{event.description}</p>
      )}

      <p style={{ margin: '6px 0 0', color: '#555' }}>
        Starts: {new Date(event.startsAt).toLocaleString()}
      </p>

      <p style={{ margin: '6px 0 0' }}>
        Countdown: <strong>{label}</strong>
      </p>
    </li>
  )
}
