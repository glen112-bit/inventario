import express from 'express'
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from '../controllers/usuarios.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { authorize } from '../middleware/role.middleware.js'

const Router = express.Router()

Router.get('/usuarios', getUsuarios)

Router.post('/usuarios', createUsuario)

Router.put(
  '/usuarios/:id',
  authMiddleware,
  authorize('admin'),
  updateUsuario
)
Router.delete(
  '/usuarios/:id',
  authMiddleware,
  authorize('admin'),
  deleteUsuario
)
export default Router
