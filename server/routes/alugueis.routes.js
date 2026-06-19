import express from 'express'

import {
  getAlugueis,
  createAluguel,
  getAluguelById,
  deleteAluguel,
  atualizarAluguel
  
} from '../controllers/alugueis.controller.js'

const router = express.Router()

router.get('/alugueis', getAlugueis)
router.get('/alugueis/:id', getAluguelById)
router.post('/alugueis', createAluguel)
router.delete('/alugueis/:id', deleteAluguel)
router.put('/alugueis/:id', atualizarAluguel)

export default router
