import { Router } from 'express'
import { getAllEvents, getEventsByLocationSlug, getEventById } from '../controllers/events.js'

const router = Router()
router.get('/', getAllEvents)
router.get('/by-location/:slug', getEventsByLocationSlug)
router.get('/:eventId', getEventById)

export default router
