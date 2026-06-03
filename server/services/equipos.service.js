// server/services/equipos.service.js
import db from '../config/db.js'; // Tu archivo de conexión a MySQL

// 1. Asegúrate de tener el "export" antes de la función constante
export const obtenerEquipos = async () => {
  try {
    const [rows] = await db.query(`
      SELECT
       e.equipamento_id,
       e.codigo_interno,
       e.numero_serie,
       e.marca,
       e.modelo,
       e.estado_actual,
       e.valor,
       e.fecha_compra,
       c.nombre AS categoria,
       u.nombre AS ubicacion
       FROM equipos e
       LEFT JOIN categorias c
       ON e.categoria_id = c.categoria_id
       LEFT JOIN ubicaciones u
       ON e.ubicacion_id = u.ubicacion_id
       ORDER BY e.equipamento_id DESC;
    `);
    return rows;
  } catch (error) {
    console.error("Erro SQL no serviço de equipos:", error);
    throw error;
  }
};

export const obtenerEquiposEnManutencao = async () => {
  try {

    const [rows] = await db.query(`
      SELECT
        e.equipamento_id,
        e.codigo_interno,
        e.numero_serie,
        e.marca,
        e.modelo,
        e.descripcion,
        e.estado_actual,
        e.valor,
        e.fecha_compra,
        c.nombre AS categoria,
        u.nombre AS ubicacion
      FROM equipos e
      LEFT JOIN categorias c
        ON e.categoria_id = c.id
      LEFT JOIN ubicaciones u
        ON e.ubicacion_id = u.id
      WHERE e.estado_actual = 'manutencao'
      ORDER BY e.equipamento_id DESC
    `)

    return rows

  } catch (error) {

    console.error(
      'Erro SQL no serviço de manutenção:',
      error
    )

    throw error

  }
}
