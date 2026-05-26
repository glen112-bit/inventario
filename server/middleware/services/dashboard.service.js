//services/dashboard.service.js

import db from '../config/db.js'

export const getDashboardStats = async () => {
  const [equiposDisponibles] = await db.query(`
    SELECT COUNT(*) as total
    FROM equipos
    WHERE estado_actual = 'disponible'
  `)

  const [equiposAlquilados] = await db.query(`
    SELECT COUNT(*) as total
    FROM equipos
    WHERE estado_actual = 'alquilado'
  `)

  const [mantenimientos] = await db.query(`
    SELECT COUNT(*) as total
    FROM mantenimientos
    WHERE estado != 'finalizado'
  `)

  const [retornosHoy] = await db.query(`
    SELECT COUNT(*) as total
    FROM alquileres
    WHERE DATE(fecha_retorno) = CURDATE()
      AND estado = 'activo'
  `)

  const [actividadReciente] = await db.query(`
    SELECT
      m.tipo,
      e.nombre as equipo,
      m.created_at
    FROM movimientos_stock m
    JOIN equipos e ON e.id = m.equipo_id
    ORDER BY m.created_at DESC
    LIMIT 10
  `)

  const [alertas] = await db.query(`
    SELECT
      nombre,
      estado_actual
    FROM equipos
    WHERE estado_actual IN ('dañado', 'mantenimiento')
    LIMIT 10
  `)

  const [graficoAlquileres] = await db.query(`
    SELECT
      DATE(fecha_salida) as fecha,
      COUNT(*) as total
    FROM alquileres
    GROUP BY DATE(fecha_salida)
    ORDER BY fecha ASC
    LIMIT 30
  `)
 // ========================================
  

  // ========================================
  // ALERTAS
  // ========================================

  const [alertas] = await db.query(`
    SELECT
      e.id,
      e.nombre,
      e.codigo_interno,
      e.estado_actual,
      u.nombre AS ubicacion

    FROM equipos e

    LEFT JOIN ubicaciones u
      ON e.ubicacion_id = u.id

    WHERE e.estado_actual IN (
      'dañado',
      'mantenimiento'
    )

    ORDER BY e.created_at DESC
  `)

  // ========================================
  // GRAFICO ALQUILERES
  // ========================================

  const [graficoAlquileres] = await db.query(`
    SELECT
      DATE(fecha_salida) as fecha,
      COUNT(*) as total

    FROM alquileres

    GROUP BY DATE(fecha_salida)

    ORDER BY fecha ASC
  `)

  // ========================================
  // GRAFICO EQUIPOS POR ESTADO
  // ========================================

  const [graficoEstados] = await db.query(`
    SELECT
      estado_actual as estado,
      COUNT(*) as total

    FROM equipos

    GROUP BY estado_actual
  `)
return {
    resumen: {
      equiposDisponibles: equiposDisponibles[0].total,
      equiposAlquilados: equiposAlquilados[0].total,
      mantenimientos: mantenimientos[0].total,
      retornosHoy: retornosHoy[0].total,
    },

    equipos,
    alquileresRecientes,
    actividadReciente,
    alertas,
    graficoAlquileres,
    graficoEstados,
  }
  // return {
    // equiposDisponibles: equiposDisponibles[0].total,
    // equiposAlquilados: equiposAlquilados[0].total,
    // mantenimientos: mantenimientos[0].total,
    // retornosHoy: retornosHoy[0].total,
    // actividadReciente,
    // alertas,
    // graficoAlquileres,
  // }
}
