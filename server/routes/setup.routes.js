import express from 'express'

import {
    getSetupStatus,
    createFirstAdmin
} from '../controllers/setup.controller.js'

const router = express.Router()

router.get(
    '/setup/status',
    getSetupStatus
)

router.post(
    '/setup/admin',
    createFirstAdmin
)

export default router
