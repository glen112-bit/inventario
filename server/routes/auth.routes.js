import express from 'express'
import { login } from '../controllers/auth.controller.js'
import { registerUser } from '../controllers/usuarios.controller.js';

const router = express.Router()

router.post('/auth/login', login)
router.post('/registrar', registerUser);

export default router
