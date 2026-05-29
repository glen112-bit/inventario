import express from 'express'

import {
  getAlugueis,
} from '../controllers/alugueis.controller.js'

const router = express.Router()

router.get('/alugueis', getAlugueis)

export default router
