import express from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js'
import {
  getAlugueis,
  createAluguel,
  getAluguelById,
  deleteAluguel,
  atualizarAluguel
  
} from '../controllers/alugueis.controller.js'

const router = express.Router()

router.get('/alugueis', authMiddleware, getAlugueis)
router.get('/alugueis/:id', authMiddleware, getAluguelById)
router.post('/alugueis', authMiddleware, createAluguel)
router.delete('/alugueis/:id', authMiddleware, deleteAluguel)
router.put('/alugueis/:id', authMiddleware, atualizarAluguel)
router.delete('/alugueis/:id', authMiddleware, deleteAluguel)

export default router
