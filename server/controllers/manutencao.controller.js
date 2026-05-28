import db from '../config/db.js'

export const getManutencao = async ( req, res ) => {
  try {
    const [rows] = await db.query(`
      SELECT
        mantenimientos.id,
        equipos.nombre AS equipamento,
        equipos.estado_actual,
        
        mantenimientos.fecha_inicio,
        mantenimientos.descripcion
      FROM mantenimientos
      INNER JOIN equipos
      ON mantenimientos.equipamento_id = equipos_id
    `)
    res.json(rows)
  } catch(error) {

    console.error(error)
    res.status(500).json({
      error: error.message 
    })
  }
}
