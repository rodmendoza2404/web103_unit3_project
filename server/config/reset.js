// server/config/reset.js
import { pool } from './database.js'

const ddl = `
CREATE TABLE IF NOT EXISTS locations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  image TEXT
);
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  startsAt TIMESTAMP NOT NULL,
  location_id INTEGER NOT NULL REFERENCES locations(id) ON DELETE CASCADE
);
`

// Keep/adjust these to match your slugs + images
const locationsSeed = [
  { name: 'Central Plaza',  slug: 'central-plaza',  image: '/images/plaza.jpg' },
  { name: 'Riverside Park', slug: 'riverside-park', image: '/images/river.jpg' },
  { name: 'Tech Hub',       slug: 'tech-hub',       image: '/images/hub.jpg' },
  { name: 'Old Town',       slug: 'old-town',       image: '/images/oldtown.jpg' }
]

// Fixed, realistic schedules per location (NO randomness)
// Dates span Oct 2025 → Mar 2026, with varied times and titles.
const schedulesBySlug = {
  'central-plaza': [
    { title: 'Open Mic Night',       when: '2025-10-11T18:30:00' },
    { title: 'Food Truck Friday',    when: '2025-11-07T19:00:00' },
    { title: 'Holiday Night Market', when: '2025-12-13T17:30:00' },
    { title: 'New Year Kickoff Fest',when: '2026-01-10T18:00:00' },
    { title: 'Valentine Pop-Up Fair',when: '2026-02-14T16:30:00' },
    { title: 'Spring Community Fair',when: '2026-03-21T15:00:00' },
  ],
  'riverside-park': [
    { title: 'Sunrise Yoga',         when: '2025-10-12T07:00:00' },
    { title: 'Riverside Run Club',   when: '2025-11-16T08:30:00' },
    { title: 'Outdoor Cinema',       when: '2025-12-20T19:30:00' },
    { title: 'Birdwatch Walk',       when: '2026-01-18T08:00:00' },
    { title: 'Picnic & Games',       when: '2026-02-22T12:00:00' },
    { title: 'Kite Festival',        when: '2026-03-29T13:00:00' },
  ],
  'tech-hub': [
    { title: 'Hack & Snack',         when: '2025-10-10T18:15:00' },
    { title: 'Lightning Talks',      when: '2025-11-14T18:30:00' },
    { title: 'AI Study Group',       when: '2025-12-12T17:45:00' },
    { title: 'Startup Demo Night',   when: '2026-01-16T18:00:00' },
    { title: 'Dev Meet & Greet',     when: '2026-02-13T18:15:00' },
    { title: 'Code Retreat',         when: '2026-03-20T09:30:00' },
  ],
  'old-town': [
    { title: 'Ghost Tour',           when: '2025-10-31T20:00:00' },
    { title: 'History Walk',         when: '2025-11-23T15:00:00' },
    { title: 'Craft Market',         when: '2025-12-07T10:00:00' },
    { title: 'Acoustic Alley',       when: '2026-01-24T19:00:00' },
    { title: 'Vintage Car Meet',     when: '2026-02-15T11:00:00' },
    { title: 'Lantern Parade',       when: '2026-03-14T18:45:00' },
  ],
}

async function run() {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    await client.query(ddl)

    // upsert locations
    for (const loc of locationsSeed) {
      await client.query(
        `INSERT INTO locations (name, slug, image)
         VALUES ($1,$2,$3)
         ON CONFLICT (slug) DO UPDATE SET name=EXCLUDED.name, image=EXCLUDED.image`,
        [loc.name, loc.slug, loc.image]
      )
    }

    // clear events to ensure deterministic seed (no duplicates)
    await client.query(`DELETE FROM events`)

    // fetch ids and insert per-location schedules
    const { rows: locs } = await client.query(`SELECT id, name, slug FROM locations`)
    for (const loc of locs) {
      const schedule = schedulesBySlug[loc.slug] || []
      for (const s of schedule) {
        await client.query(
          `INSERT INTO events (title, description, startsAt, location_id)
           VALUES ($1,$2,$3,$4)`,
          [
            s.title,
            `Join us at ${loc.name} for ${s.title.toLowerCase()}.`,
            s.when, // local time; add 'Z' if you prefer UTC
            loc.id
          ]
        )
      }
    }

    await client.query('COMMIT')
    console.log('DB reset')
  } catch (e) {
    await client.query('ROLLBACK')
    console.error('reset error:', e.message)
  } finally {
    client.release()
    await pool.end()
  }
}
run()
