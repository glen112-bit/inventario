import express from 'express'
import { getAnalytics } from '../controllers/analytics.controller.js'

const router = express.Router()

router.get('/',(req, res, next) => {
  console.log('entro analitics')
  next()
}, getAnalytics)

export default router
