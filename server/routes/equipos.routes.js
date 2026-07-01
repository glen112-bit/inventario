import express from 'express'

import {
  createEquipamento,
  getHistoricoEquipamento,
  registrarHistoricoEquipamento,
  getEquipamentoById,
  getInventarioAgrupado,
  getEquipamentosModelo,
  adicionarUnidade,
  removerUnidade

} from '../controllers/equipos.controller.js'

import { authMiddleware } from '../middleware/auth.middleware.js'

import { authorize } from '../middleware/role.middleware.js'

const router = express.Router()

router.get('/inventario/agrupado',  getInventarioAgrupado)

router.get('/inventario/equipamento/:id', getEquipamentoById)

router.get('/inventario/:marca/:modelo', getEquipamentosModelo)

router.get('/inventario/:id/historico', getHistoricoEquipamento)

router.post(
'/inventario', 
  authMiddleware, 
  authorize('admin'), 
  createEquipamento
)

router.post(
'/inventario/unidade', 
  authMiddleware, 
  authorize('admin'), 
  adicionarUnidade
)

router.post(
'/inventario/:id/historico',
  registrarHistoricoEquipamento
)


router.delete(
'/inventario/unidade/:id', 
  authMiddleware, 
  authorize('admin'), 
  removerUnidade
)

export default router
