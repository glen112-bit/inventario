import db from '../config/db.js'

export const getStats = async (req, res) => {
  try {

    const [equipos] = await db.query(
      'SELECT COUNT(*) total FROM equipos'
    )

    const [disponibles] = await db.query(
      "SELECT COUNT(*) total FROM equipos WHERE estado_actual = 'disponible'"
    )

    const [alquilados] = await db.query(
      "SELECT COUNT(*) total FROM equipos WHERE estado_actual = 'alugado'"
    )

    const [mantenimiento] = await db.query(
      "SELECT COUNT(*) total FROM equipos WHERE estado_actual = 'mantenimiento'"
    )

    const [clientes] = await db.query(
      'SELECT COUNT(*) total FROM clientes'
    )

    const [usuarios] = await db.query(
      'SELECT COUNT(*) total FROM usuarios'
    )

    const [alugueis] = await db.query(
      'SELECT COUNT(*) total FROM alugueis'
    )

    res.json({
      totalEquipos: equipos[0].total,
      equiposDisponibles: disponibles[0].total,
      equiposAlquilados: alquilados[0].total,
      equiposMantenimiento: mantenimiento[0].total,
      clientes: clientes[0].total,
      usuarios: usuarios[0].total,
      alugueis: alugueis[0].total
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error: error.message
    })

  }
}
