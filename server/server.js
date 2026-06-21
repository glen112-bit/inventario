import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'

import alugueisRoutes from './routes/alugueis.routes.js';
import equiposRoutes from './routes/equipos.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js'
import clientesRoutes from './routes/clientes.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js'
import manutencaoRoutes from './routes/manutencao.routes.js'
import analyticsRoutes from './routes/analytics.routes.js'
import configRoutes from './routes/config.routes.js'
import authRoutes from './routes/auth.routes.js'

dotenv.config()
const app = express();


app.use(cors({
  // origin: process.env.FRONTEND_URL,
  origin:[
       'http://localhost:5173',
    'https://inventario.suaempresa.com' 
  ],
  credentials: true
}));
console.log('FRONTEND_URL:', process.env.FRONTEND_URL)
app.use(express.json());

app.use('/api', alugueisRoutes);
app.use('/api', equiposRoutes);
app.use('/api', usuariosRoutes)
app.use('/api', clientesRoutes)
app.use('/api', manutencaoRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/config', configRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api', authRoutes)

const PORT = process.env.PORT || 3001
app.get('/ping', (req,res) => {
  console.log('PING')
  res.json({
    ok: true
  })
})
app.listen(PORT, () => {

  console.log(`Servidor corriendo en puerto ${PORT}`);
});
