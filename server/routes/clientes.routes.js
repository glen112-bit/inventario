import express from 'express'

import {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente
} from '../controllers/clientes.controller.js'

import { authMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get(
  '/clientes',
  authMiddleware,
  getClientes
)

router.post(
  '/clientes',
  authMiddleware,
  createCliente
)

router.put(
  '/clientes/:id',
  authMiddleware,
  updateCliente
)

router.delete(
  '/clientes/:id',
  authMiddleware,
  deleteCliente
)

export default router
