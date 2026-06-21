import express from 'express'

import {
  getEquipos,
  createEquipamento,
  getHistoricoEquipamento,
  registrarHistoricoEquipamento,
  getEquipamentoById,
  getInventarioAgrupado,
  getEquipamentosModelo
  
} from '../controllers/equipos.controller.js'
import {
  authMiddleware
} from '../middleware/auth.middleware.js'

import {
  authorize
} from '../middleware/role.middleware.js'

const router = express.Router()

router.get('/inventario', getEquipos)
router.get('/inventario',authMiddleware, getEquipos)
router.get('/inventario/:id/historico', getHistoricoEquipamento)

router.get('/inventario',  getInventarioAgrupado)

router.get('/inventario/:marca/:modelo', getEquipamentosModelo)
router.post('/inventario', authMiddleware, authorize('admin'), createEquipamento)
router.post('/inventario/:id/historico', registrarHistoricoEquipamento)

export default router
