import { pool } from '../config/database.js'

export const getAllEvents = async (_req, res) => {
  try {
    const q = `
      SELECT e.id, e.title, e.description, e.startsat AS "startsAt",
             l.id AS "locationId", l.name AS "locationName", l.slug
      FROM events e
      JOIN locations l ON e.location_id = l.id
      ORDER BY e.startsat ASC
    `
    const { rows } = await pool.query(q)
    res.status(200).json(rows)
  } catch (e) {
    res.status(409).json({ error: e.message })
  }
}

export const getEventsByLocationSlug = async (req, res) => {
  try {
    const q = `
      SELECT e.id, e.title, e.description, e.startsat AS "startsAt",
             l.id AS "locationId", l.name AS "locationName", l.slug
      FROM events e
      JOIN locations l ON e.location_id = l.id
      WHERE l.slug = $1
      ORDER BY e.startsat ASC
    `
    const { rows } = await pool.query(q, [req.params.slug])
    res.status(200).json(rows)
  } catch (e) {
    res.status(409).json({ error: e.message })
  }
}

export const getEventById = async (req, res) => {
  try {
    const q = `
      SELECT e.id, e.title, e.description, e.startsat AS "startsAt",
             l.id AS "locationId", l.name AS "locationName", l.slug
      FROM events e
      JOIN locations l ON e.location_id = l.id
      WHERE e.id = $1
    `
    const { rows } = await pool.query(q, [req.params.eventId])
    if (!rows.length) return res.status(404).json({ error: 'Event not found' })
    res.status(200).json(rows[0])
  } catch (e) {
    res.status(409).json({ error: e.message })
  }
}