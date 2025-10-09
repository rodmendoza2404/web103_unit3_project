import express from 'express'
import cors from 'cors'
import './config/database.js' // ensures env vars loaded by your runner (if using dotenv, import it)
import locationsRouter from './routes/locations.js'
import eventsRouter from './routes/events.js'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (_req, res) => {
  res.status(200).send('<h1 style="text-align:center;margin-top:40px">Virtual Community API</h1>')
})

app.use('/api/locations', locationsRouter)
app.use('/api/events', eventsRouter)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`🚀 API listening on http://localhost:${PORT}`))
