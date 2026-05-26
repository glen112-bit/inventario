// routes/dashboard.routes.js
import express from 'express';
const router = express.Router();
import {getStats} from '../controllers/dashboard.controller.js'

// Associa a rota de estatísticas à função correta
router.get('/stats', getStats);

export default router;
