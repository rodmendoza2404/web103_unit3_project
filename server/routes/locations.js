import { Router } from 'express'
import { getAllLocations, getLocationBySlug } from '../controllers/locations.js'

const router = Router()
router.get('/', getAllLocations)
router.get('/:slug', getLocationBySlug)

export default router
