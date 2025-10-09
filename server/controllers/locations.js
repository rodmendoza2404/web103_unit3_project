import { pool } from '../config/database.js'

export const getAllLocations = async (_req, res) => {
  try {
    const q = `SELECT id, name, slug, image FROM locations ORDER BY id`
    const { rows } = await pool.query(q)
    res.status(200).json(rows)
  } catch (e) {
    res.status(409).json({ error: e.message })
  }
}

export const getLocationBySlug = async (req, res) => {
  try {
    const { slug } = req.params
    const q = `SELECT id, name, slug, image FROM locations WHERE slug=$1`
    const { rows } = await pool.query(q, [slug])
    if (!rows.length) return res.status(404).json({ error: 'Location not found' })
    res.status(200).json(rows[0])
  } catch (e) {
    res.status(409).json({ error: e.message })
  }
}
