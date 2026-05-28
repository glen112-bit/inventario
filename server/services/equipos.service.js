// server/services/equipos.service.js
import db from '../config/db.js'; // Tu archivo de conexión a MySQL

// 1. Asegúrate de tener el "export" antes de la función constante
export const obtenerEquipos = async () => {
  try {
    const [rows] = await db.query(`
      SELECT id, nome, categoria, numero_serie, status, valor_diaria 
      FROM equipamentos 
      ORDER BY nome ASC
    `);
    return rows;
  } catch (error) {
    console.error("Erro SQL no serviço de equipos:", error);
    throw error;
  }
};
