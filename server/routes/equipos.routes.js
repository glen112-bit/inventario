import express from 'express'

import {
  getEquipos,
  createEquipamento
} from '../controllers/equipos.controller.js'

const router = express.Router()

router.get('/inventario', getEquipos)
router.post('/inventario', createEquipamento)

export default router
