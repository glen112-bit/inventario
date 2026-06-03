import db from '../config/db.js'

export const getAnalytics = async (req, res) => {

  try {

    const [equipamentos] = await db.query(`
      SELECT COUNT(*) total
      FROM equipos
    `)

    const [clientes] = await db.query(`
      SELECT COUNT(*) total
      FROM clientes
    `)

    const [alugueis] = await db.query(`
      SELECT COUNT(*) total
      FROM alugueis
    `)

    const [manutencao] = await db.query(`
      SELECT COUNT(*) total
      FROM equipos
      WHERE estado_actual = 'manutencao'
      OR estado_actual = 'mantenimiento'
    `)

    const [porEstado] = await db.query(`
      SELECT
        estado_actual,
        COUNT(*) total
      FROM equipos
      GROUP BY estado_actual
    `)

    const [porMarca] = await db.query(`
      SELECT
        marca,
        COUNT(*) total
      FROM equipos
      GROUP BY marca
      ORDER BY total DESC
    `)

    res.json({
      totalEquipamentos: equipamentos[0].total,
      totalClientes: clientes[0].total,
      totalAlugueis: alugueis[0].total,
      totalManutencao: manutencao[0].total,
      porEstado,
      porMarca
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error: error.message
    })

  }

}
