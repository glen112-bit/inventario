import express from 'express';
import cors from 'cors';

import alugueisRoutes from './routes/alugueis.routes.js';
import equiposRoutes from './routes/equipos.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js'
import clientesRoutes from './routes/clientes.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js'
import manutencaoRoutes from './routes/manutencao.routes.js'

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', alugueisRoutes);
app.use('/api', equiposRoutes);
app.use('/api', usuariosRoutes)
app.use('/api', clientesRoutes)
app.use('/api', manutencaoRoutes)
app.use('/api/dashboard', dashboardRoutes)

app.listen(3001, () => {
  console.log('Servidor corriendo en puerto 3001');
});
