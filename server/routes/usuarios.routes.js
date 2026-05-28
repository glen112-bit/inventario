import express from 'express'
import { getUsuarios } from '../controllers/usuarios.controller.js'

const Router = express.Router()

Router.get('/usuarios', getUsuarios)

export default Router
