import express from 'express'
import { getUsuarios, createUsuario } from '../controllers/usuarios.controller.js'

const Router = express.Router()

Router.get('/usuarios', getUsuarios)

Router.post('/usuarios', createUsuario)

export default Router
