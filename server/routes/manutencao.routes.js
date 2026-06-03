import express from 'express'
import { getManutencoes } from '../controllers/equipos.controller.js'

const Router = express.Router()

Router.get('/manutencao', getManutencoes)

export default Router
