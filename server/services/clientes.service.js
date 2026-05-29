
// server/services/equipos.service.js
import db from '../config/db.js'; // Tu archivo de conexión a MySQL

// 1. Asegúrate de tener el "export" antes de la función constante
export const obtenerClientes = async () => {
  try {
    const [rows] = await db.query(`
      SELECT id, nombre, documento, telefone, endereco, email, created_at  
      FROM clientes 
      ORDER BY nome ASC
    `);
    return rows;
  } catch (error) {
    console.error("Erro SQL no serviço de clientes:", error);
    throw error;
  }
};
