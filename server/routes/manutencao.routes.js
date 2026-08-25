import express from 'express'

import {
  getManutencoes,
  getManutencao,
  createManutencao,
  updateManutencao,
  deleteManutencao
} from '../controllers/manutencao.controller.js'

import { authMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get(
  '/manutencao',
  authMiddleware,
  getManutencoes
)

router.get(
  '/manutencao/:id',
  authMiddleware,
  getManutencao
)

router.post(
  '/manutencao',
  authMiddleware,
  createManutencao
)

router.put(
  '/manutencao/:id',
  authMiddleware,
  updateManutencao
)

router.delete(
  '/manutencao/:id',
  authMiddleware,
  deleteManutencao
)

export default router
