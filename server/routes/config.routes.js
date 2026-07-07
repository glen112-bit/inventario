import express from 'express'

import {
  getMarcas,
  createMarca,
  updateMarca,
  deleteMarca,

  getCategorias,
  updateCategoria,
  getLocalizacoes,
  createCategoria
} from '../controllers/config.controller.js'

import { authMiddleware } from '../middleware/auth.middleware.js'
import { authorize } from '../middleware/role.middleware.js'

const router = express.Router( )

router.use(authMiddleware)

// MARCAS
router.get('/marcas', getMarcas)
// router.post('/marcas', createMarca)
router.put('/marcas/:id', authorize('admin'), updateMarca)
router.delete('/marcas/:id', authorize('admin'), deleteMarca)

// CATEGORIAS
router.get('/categorias', getCategorias)
router.put('/categorias/:id', updateCategoria)
router.post('/categorias', createCategoria)
// LOCALIZACOES
router.get('/localizacoes', getLocalizacoes)
//estados

router.post(
  '/marcas',
  authorize('admin'),
  createMarca
)

router.put(
  '/marcas/:id',
  authorize('admin'),
  updateMarca
)

router.delete(
  '/marcas/:id',
  authorize('admin'),
  deleteMarca
)

router.post(
  '/categorias',
  authorize('admin'),
  createCategoria
)

router.put(
  '/categorias/:id',
  authorize('admin'),
  updateCategoria
)

export default router
