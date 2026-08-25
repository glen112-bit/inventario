import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';

import {
    getAlugueis,
    createAluguel,
    getAluguelById,
    atualizarAluguel,
    deleteAluguel,
    getAluguelDetalhes
} from '../controllers/alugueis.controller.js';

const router = express.Router();

router.get('/alugueis', authMiddleware, getAlugueis);

router.get('/alugueis/:id', authMiddleware, getAluguelById);

router.get('/alugueis/:id/detalhes', authMiddleware, getAluguelDetalhes);

router.post('/alugueis', authMiddleware, createAluguel);

router.put('/alugueis/:id', authMiddleware, atualizarAluguel);

router.delete('/alugueis/:id', authMiddleware, deleteAluguel);

export default router;
