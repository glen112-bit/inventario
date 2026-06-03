import express from 'express'

import {
  getMarcas,
  createMarca,
  updateMarca,
  deleteMarca,

  getCategorias,
  getLocalizacoes,
  atualizarEstadoEquipamento
} from '../controllers/config.controller.js'

const router = express.Router()

// MARCAS
router.get('/marcas', getMarcas)
router.post('/marcas', createMarca)
router.put('/marcas/:id', updateMarca)
router.delete('/marcas/:id', deleteMarca)

// CATEGORIAS
router.get('/categorias', getCategorias)

// LOCALIZACOES
router.get('/localizacoes', getLocalizacoes)
//estados
router.put(
  '/config/:id/estado',
  atualizarEstadoEquipamento
)
export default router
