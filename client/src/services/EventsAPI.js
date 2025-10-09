export async function getAllEvents() {
  const res = await fetch('/api/events')
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}
export async function getEventsByLocationSlug(slug) {
  const res = await fetch(`/api/events/by-location/${slug}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}
export async function getEventById(id) {
  const res = await fetch(`/api/events/${id}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}
