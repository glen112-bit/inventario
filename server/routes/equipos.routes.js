import express from 'express'

import {
  getEquipos,
} from '../controllers/equipos.controller.js'

const router = express.Router()

router.get('/inventario', getEquipos)

export default router
