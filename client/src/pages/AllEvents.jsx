import { useEffect, useMemo, useState } from 'react'
import { getAllEvents } from '../services/EventsAPI'
import Event from '../components/Event'

export default function AllEvents() {
  const [events, setEvents] = useState([])
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('soonest')

  useEffect(() => {
    (async () => {
      try { setEvents(await getAllEvents()) }
      catch (e) { setError(e.message) }
    })()
  }, [])

  const locations = useMemo(
    () => ['all', ...Array.from(new Set(events.map(e => e.slug)))],
    [events]
  )

  const view = useMemo(() => {
    let list = [...events]
    if (filter !== 'all') list = list.filter(e => e.slug === filter)
    if (sort === 'soonest') list.sort((a,b) => new Date(a.startsAt) - new Date(b.startsAt))
    if (sort === 'latest')  list.sort((a,b) => new Date(b.startsAt) - new Date(a.startsAt))
    return list
  }, [events, filter, sort])

  if (error) return <p style={{ color:'crimson' }}>Error: {error}</p>

  return (
    <section style={{ maxWidth: 960, margin:'2rem auto', padding:'1rem' }}>
      <h2>All Events</h2>
      <div style={{ display:'flex', gap:12, marginBottom:12 }}>
        <label>Filter:
          <select value={filter} onChange={e=>setFilter(e.target.value)} style={{ marginLeft: 6 }}>
            {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </select>
        </label>
        <label>Sort:
          <select value={sort} onChange={e=>setSort(e.target.value)} style={{ marginLeft: 6 }}>
            <option value="soonest">Soonest</option>
            <option value="latest">Latest</option>
          </select>
        </label>
      </div>

      <ul style={{ padding: 0, display: 'grid', gap: 12 }}>
        {view.map(evt => (
            <Event key={evt.id} event={evt} showLocation />
        ))}
      </ul>
      
    </section>
  )
}
