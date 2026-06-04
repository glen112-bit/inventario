import db from '../config/db.js'

export const getStats = async (req, res) => {

  try {

    const [[equipos]] = await db.query(`
      SELECT COUNT(*) total
      FROM equipos
    `)

    const [[disponiveis]] = await db.query(`
      SELECT COUNT(*) total
      FROM equipos
      WHERE estado_actual = 'disponivel'
    `)

    const [[manutencao]] = await db.query(`
      SELECT COUNT(*) total
      FROM equipos
      WHERE estado_actual = 'manutencao'
    `)

    const [[usuarios]] = await db.query(`
      SELECT COUNT(*) total
      FROM usuarios
    `)

    const [equipamentosManutencao] = await db.query(`
      SELECT
        equipamento_id,
        codigo_interno,
        marca,
        modelo
      FROM equipos
      WHERE estado_actual =  'manutencao'
      LIMIT 10
    `)

    const [ultimosAlugueis] = await db.query(`
      SELECT
        a.id,
        c.nome AS cliente,
        a.fecha_salida,
        a.fecha_retorno,
        a.estado
      FROM alugueis a
      JOIN clientes c
        ON c.id = a.cliente_id
      ORDER BY a.id DESC
      LIMIT 10
    `)

    res.json({
      totalEquipos: equipos.total,
      equiposDisponiveis: disponiveis.total,
      equiposManutencao: manutencao.total,
      usuarios: usuarios.total,
      equipamentosManutencao,
      ultimosAlugueis
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error: error.message
    })

  }

}
