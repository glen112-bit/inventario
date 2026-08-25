import express from 'express'
import { getAnalytics } from '../controllers/analytics.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get(
  '/',
  authMiddleware,
  getAnalytics
)

export default router
