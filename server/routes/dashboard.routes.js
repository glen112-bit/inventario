// routes/dashboard.routes.js
import express from 'express';

import {getStats} from '../controllers/dashboard.controller.js'
const router = express.Router();

// Associa a rota de estatísticas à função correta
router.get('/stats', getStats);

export default router;
