import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import dashboardRoutes from './routes/dashboard.routes.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());


// app.use('/stats', dashboardRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.listen(3001, () => {
  console.log('Servidor corriendo en puerto 3001');
});
