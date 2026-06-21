import express from 'express'
import {
  getClientes,
  createCliente
} from '../controllers/clientes.controller.js'

const Router = express.Router()

Router.get('/clientes', getClientes)
Router.post('/clientes', createCliente)

export default Router
