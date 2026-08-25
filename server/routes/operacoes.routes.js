import express from 'express'

import {
    listarOperacoes,
    obterOperacao,
    criarOperacao,
    lerQrCode,
    devolverEquipamento,
    finalizarOperacao
} from '../controllers/operacoes.controller.js'

const router = express.Router()

// Listar operações
router.get(
    '/operacoes',
    listarOperacoes
)

// Buscar operação
router.get(
    '/operacoes/:id',
    obterOperacao
)

// Criar nova operação
router.post(
    '/operacoes',
    criarOperacao
)

// Ler QR na saída
router.post(
    '/operacoes/:id/scan',
    lerQrCode
)

// Ler QR na devolução
router.post(
    '/operacoes/:id/devolver',
    devolverEquipamento
)

// Finalizar operação
router.put(
    '/operacoes/:id/finalizar',
    finalizarOperacao
)

export default router
