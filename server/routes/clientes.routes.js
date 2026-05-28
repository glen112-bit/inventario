import express from 'express'
import { getClientes } from '../controllers/clientes.controller.js'

const Router = express.Router()

Router.get('/clientes', getClientes)

export default Router
