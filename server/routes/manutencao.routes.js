import express from 'express'
import { getManutencao } from '../controllers/manutencao.controller.js'

const Router = express.Router()

Router.get('/manutencao', getManutencao)

export default Router
