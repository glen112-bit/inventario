import express from 'express'

import {
  getManutencoes,
  getManutencao,
  createManutencao,
  updateManutencao,
  deleteManutencao
} from '../controllers/manutencao.controller.js'

const router = express.Router()

router.get('/manutencao', getManutencoes)

router.get('/manutencao/:id', getManutencao)

router.post('/manutencao', createManutencao)

router.put('/manutencao/:id', updateManutencao)

router.delete('/manutencao/:id', deleteManutencao)

export default router
