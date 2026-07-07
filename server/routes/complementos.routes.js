import express from 'express'

import {
  getComplementosByAluguel,
  getComplementoById,
  createComplemento,
  updateComplemento,
  deleteComplemento,
  finalizarComplemento
} from '../controllers/complementos.controller.js'

const Router = express.Router()

Router.get(
  '/alugueis/:id/complementos',
  getComplementosByAluguel
)
Router.get(
  '/complementos/:id',
  getComplementoById
)

Router.post(
  '/complementos',
  createComplemento
)

Router.put(
  '/complementos/:id',
  updateComplemento
)

Router.put(
  '/complementos/:id/finalizar',
  finalizarComplemento
)

Router.delete(
  '/complementos/:id',
  deleteComplemento
)

export default Router
