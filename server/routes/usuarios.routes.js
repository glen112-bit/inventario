import express from 'express'
import { 
  getUsuarios,
  registerUser,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  alterarSenha,
  alterarStatus,
  deleteUsuario 
} from '../controllers/usuarios.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { authorize } from '../middleware/role.middleware.js'

const Router = express.Router()

Router.get('/usuarios', getUsuarios)

Router.post('/usuarios', createUsuario)

Router.put(
  '/usuarios/:id',
  authMiddleware,
  authorize('admin', 'operador'),
  updateUsuario
)
Router.put(
  '/usuarios/:id/senha',
  alterarSenha
)
Router.put(
  '/usuarios/:id/status',
  alterarStatus
)
Router.get(
  '/usuarios/:id',
  getUsuarioById
)
Router.delete(
  '/usuarios/:id',
  authMiddleware,
  authorize('admin', 'operador'),
  deleteUsuario
)
Router.post(
  '/registrar',
  registerUser
)
export default Router
