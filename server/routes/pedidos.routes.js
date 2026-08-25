import express from 'express'

import {
    getPedidos,
    getPedido,
    createPedido,
    updatePedido,
    deletePedido,
    addEquipamentoPedido,
    removeEquipamentoPedido,
    getEquipamentosPedido,
    finalizarPedido
} from '../controllers/pedidos.controller.js'

const router = express.Router()

//======================================================
// Pedidos
//======================================================

router.get(
    '/',
    getPedidos
)

router.get(
    '/:id',
    getPedido
)

router.post(
    '/',
    createPedido
)

router.put(
    '/:id',
    updatePedido
)

router.delete(
    '/:id',
    deletePedido
)

//======================================================
// Equipamentos do Pedido
//======================================================

router.get(
    '/:id/equipamentos',
    getEquipamentosPedido
)

router.post(
    '/:id/equipamentos',
    addEquipamentoPedido
)

router.delete(
    '/:id/equipamentos/:equipamentoId',
    removeEquipamentoPedido
)

//======================================================
// Status
//======================================================

router.put(
    '/:id/finalizar',
    finalizarPedido
)

export default router
