
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
      AND estado IN ('activo', 'reservado')
  `)

  // ========================================
  // EQUIPOS COMPLETOS
  // ========================================
 const [equipos] = await db.query(`
    SELECT
      e.id,
      e.codigo_interno,
      e.numero_serie,
      e.nombre,
      e.modelo,
      e.estado_actual,
      e.valor,
      e.fecha_compra,

      c.nombre AS categoria,
      m.nombre AS marca,
      u.nombre AS ubicacion

    FROM equipos e

    LEFT JOIN categorias c
      ON e.categoria_id = c.id

    LEFT JOIN marcas m
      ON e.marca_id = m.id

    LEFT JOIN ubicaciones u
      ON e.ubicacion_id = u.id

    ORDER BY e.created_at DESC
  `)
 // ========================================
  // ALQUILERES COMPLETOS
  // ========================================

  const [alquileresRecientes] = await db.query(`
    SELECT
      a.id,
      a.fecha_salida,
      a.fecha_retorno,
      a.estado,
      a.observaciones,

      c.nombre AS cliente,
      us.nombre AS usuario,

      COUNT(ad.id) AS cantidad_equipos

    FROM alquileres a

    LEFT JOIN clientes c
      ON a.cliente_id = c.id

    LEFT JOIN usuarios us
      ON a.usuario_id = us.id

    LEFT JOIN alquiler_detalles ad
      ON a.id = ad.alquiler_id

    GROUP BY a.id

    ORDER BY a.created_at DESC

    LIMIT 10
  `)

// ========================================
  // ACTIVIDAD RECIENTE
  // ========================================

  const [actividadReciente] = await db.query(`
    SELECT
      ms.id,
      ms.tipo,
      ms.descripcion,
      ms.created_at,

      e.nombre AS equipo,
      e.codigo_interno,

      us.nombre AS usuario

    FROM movimientos_stock ms

    LEFT JOIN equipos e
      ON ms.equipo_id = e.id

    LEFT JOIN usuarios us
      ON ms.usuario_id = us.id

    ORDER BY ms.created_at DESC

    LIMIT 20
  `)

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
}
