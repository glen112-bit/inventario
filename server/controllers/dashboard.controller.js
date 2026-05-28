import db from '../config/db.js'

export const getStats = async (req, res) => {
  try {

    const [equipos] = await db.query(
      'SELECT COUNT(*) as total FROM equipos'
    )

    const [clientes] = await db.query(
      'SELECT COUNT(*) as total FROM clientes'
    )

    const [usuarios] = await db.query(
      'SELECT COUNT(*) as total FROM usuarios'
    )

    const [mantenimientos] = await db.query(
      'SELECT COUNT(*) as total FROM mantenimientos'
    )

    res.json({
      equipos: equipos[0].total,
      clientes: clientes[0].total,
      usuarios: usuarios[0].total,
      mantenimientos: mantenimientos[0].total
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error: error.message
    })
  }
}
