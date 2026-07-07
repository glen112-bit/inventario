import express from 'express'

import {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente
} from '../controllers/clientes.controller.js'

const router = express.Router()

router.get('/clientes', getClientes)
router.post('/clientes', createCliente)
router.put('/clientes/:id', updateCliente)
router.delete('/clientes/:id', deleteCliente)

export default router
