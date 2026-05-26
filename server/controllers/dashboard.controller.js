// controllers/dashboard.controller.js
import db from '../config/db.js';

const getStats = async (req, res) => {
  try {
    const [
      [infoEquipos], 
      [usuariosRows]
    ] = await Promise.all([
      db.query(`
        SELECT 
          COUNT(*) AS total,
          SUM(CASE WHEN estado_actual = 'disponible' THEN 1 ELSE 0 END) AS disponibles,
          SUM(CASE WHEN estado_actual = 'alquilado' THEN 1 ELSE 0 END) AS alquilados,
          SUM(CASE WHEN estado_actual = 'mantenimiento' THEN 1 ELSE 0 END) AS mantenimientos
        FROM equipos
      `),
      db.query(`SELECT COUNT(*) AS total FROM usuarios`)
    ]);

    const statsEquipos = infoEquipos[0];

    res.json({
      success: true,
      stats: {
        totalEquipos: statsEquipos.total || 0,
        equiposDisponibles: statsEquipos.disponibles || 0,
        equiposAlquilados: statsEquipos.alquilados || 0,
        mantenimientosPendientes: statsEquipos.mantenimientos || 0,
        prestamosActivos: statsEquipos.alquilados || 0,
        usuarios: usuariosRows[0].total || 0
      }
    });

  } catch (error) {
    console.error("❌ Error en getStats:", error);
    res.status(500).json({
      success: false,
      message: 'Error obteniendo estadísticas del dashboard',
      error: error.message
    });
  }
};

export { getStats };
