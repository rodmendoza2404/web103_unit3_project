export async function getAllLocations() {
  const res = await fetch('/api/locations')
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}
export async function getLocationBySlug(slug) {
  const res = await fetch(`/api/locations/${slug}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}
