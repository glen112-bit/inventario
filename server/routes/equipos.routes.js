import express from 'express'

import {
  createEquipamento,
  editarEquipamento,
  getEquipamentoProfile,
  getHistoricoEquipamento,
  registrarHistoricoEquipamento,
  getEquipamentoById,
  getEquipamentos,
  getInventarioAgrupado,
  getEquipamentosModelo,
  adicionarUnidade,
  atualizarEstadoEquipamento,
  removerUnidade,
  getEquipamentoByQR,
  listarHistoricoEquipamentos
} from '../controllers/equipos.controller.js'

import { authMiddleware } from '../middleware/auth.middleware.js'
import { authorize } from '../middleware/role.middleware.js'

const router = express.Router()

// ==========================================================
// INVENTARIO
// ==========================================================

router.get(
  '/inventario',
  authMiddleware,
  getEquipamentos
)

router.get(
  '/inventario/agrupado',
  authMiddleware,
  getInventarioAgrupado
)

router.get(
  '/inventario/equipamento/:id',
  authMiddleware,
  getEquipamentoById
)

router.get(
  '/inventario/:marca/:modelo',
  authMiddleware,
  getEquipamentosModelo
)

router.get(
  '/inventario/:id/historico',
  authMiddleware,
  getHistoricoEquipamento
)

router.get(
  '/inventario/:id',
  authMiddleware,
  getEquipamentoById
)


// ==========================================================
// PERFIL DO EQUIPAMENTO
// ==========================================================

router.get(
  '/equipamentos/:id/profile',
  authMiddleware,
  getEquipamentoProfile
)


// ==========================================================
// HISTÓRICO DE EQUIPAMENTOS
// ==========================================================

router.get(
  '/equipamentos/historico',
  authMiddleware,
  listarHistoricoEquipamentos
)

router.get(
  '/equipamentos/:id/historico',
  authMiddleware,
  getHistoricoEquipamento
)


// ==========================================================
// QR CODE
// ==========================================================

router.get(
  '/equipamentos/qr/:codigo',
  authMiddleware,
  getEquipamentoByQR
)


// ==========================================================
// CRIAR EQUIPAMENTO
// ==========================================================

router.post(
  '/inventario',
  authMiddleware,
  authorize('admin'),
  createEquipamento
)


// ==========================================================
// ADICIONAR UNIDADE
// ==========================================================

router.post(
  '/inventario/unidade',
  authMiddleware,
  authorize('admin'),
  adicionarUnidade
)


// ==========================================================
// HISTÓRICO
// ==========================================================

router.post(
  '/inventario/:id/historico',
  authMiddleware,
  registrarHistoricoEquipamento
)


// ==========================================================
// REMOVER UNIDADE
// ==========================================================

router.delete(
  '/inventario/unidade/:id',
  authMiddleware,
  authorize('admin'),
  removerUnidade
)


// ==========================================================
// ALTERAR ESTADO
// ==========================================================

router.put(
  '/equipamentos/:id/estado',
  authMiddleware,
  atualizarEstadoEquipamento
)


// ==========================================================
// EDITAR EQUIPAMENTO
// ==========================================================

router.put(
  '/inventario/:id',
  authMiddleware,
  authorize('admin'),
  editarEquipamento
)


// ==========================================================
// EXPORT
// ==========================================================

export default router
