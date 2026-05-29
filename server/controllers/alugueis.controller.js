import db from '../config/db.js'

export const getAlugueis = async (req, res) => {
  try {

    const [rows] = await db.query(`
      SELECT
        a.id,
        a.cliente_id,
        c.nome AS cliente,
        a.fecha_salida,
        a.fecha_retorno,
        a.estado,
        a.observacoes,
        a.usuario_id,
        a.created_at
      FROM alugueis a
      LEFT JOIN clientes c
        ON c.id = a.cliente_id
      ORDER BY a.id DESC
    `)

    res.json(rows)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error: error.message
    })

  }
}
