import express from 'express'

import {
  getUsuarios,
  registerUser,
  createUsuario,
  updateUsuario,
  alterarStatus,
  alterarSenha,
  deleteUsuario,
  getUsuarioById
} from '../controllers/usuarios.controller.js'

import { authMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/registrar', registerUser)

router.get(
  '/usuarios',
  authMiddleware,
  getUsuarios
)

router.get(
  '/usuarios/:id',
  authMiddleware,
  getUsuarioById
)

router.post(
  '/usuarios',
  authMiddleware,
  createUsuario
)

router.put(
  '/usuarios/:id',
  authMiddleware,
  updateUsuario
)

router.put(
  '/usuarios/:id/status',
  authMiddleware,
  alterarStatus
)

router.put(
  '/usuarios/:id/senha',
  authMiddleware,
  alterarSenha
)

router.delete(
  '/usuarios/:id',
  authMiddleware,
  deleteUsuario
)

export default router
