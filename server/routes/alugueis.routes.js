import express from 'express'

import {
  getAlugueis,
  createAluguel,
  
} from '../controllers/alugueis.controller.js'

const router = express.Router()

router.get('/alugueis', getAlugueis)
router.post('/alugueis', createAluguel)

export default router
