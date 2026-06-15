
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

export const createAluguel = async (req, res) => {
  try {

    const {
      cliente_id,
      fecha_salida,
      fecha_retorno,
      usuario_id,
      observacoes,
      equipamentos
    } = req.body

    const [result] = await db.query(`
      INSERT INTO alugueis (
        cliente_id,
        fecha_salida,
        fecha_retorno,
        estado,
        observacoes,
        usuario_id
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      cliente_id,
      fecha_salida,
      fecha_retorno,
      'ativo',
      observacoes || null,
      usuario_id
    ])

    const aluguelId = result.insertId

    for (const equipamentoId of equipamentos) {

      await db.query(`
        INSERT INTO aluguel_itens (
          aluguel_id,
          equipamento_id
        )
        VALUES (?, ?)
      `, [
        aluguelId,
        equipamentoId
      ])

      await db.query(`
        UPDATE equipos
        SET estado_actual = 'alugado'
        WHERE equipamento_id = ?
      `, [equipamentoId])

      await db.query(`
        INSERT INTO historico_equipamentos (
          equipamento_id,
          estado_anterior,
          estado_novo,
          observacao,
          usuario_id
        )
        VALUES (?, ?, ?, ?, ?)
      `, [
        equipamentoId,
        'disponivel',
        'alugado',
        'Equipamento alugado',
        usuario_id
      ])
    }

    res.status(201).json({
      success: true,
      aluguelId
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error: error.message
    })

  }
}


