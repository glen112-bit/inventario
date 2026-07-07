
import db from '../config/db.js'
import {
  registrarHistoricoEquipamento
} from './equipos.controller.js'

export const getAlugueis = async (req, res) => {
  try {
    if(req.user.rol === 'cliente') {

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
    a.created_at,

    COUNT(ai.equipamento_id) AS total_equipamentos

FROM alugueis a

LEFT JOIN clientes c
    ON c.id = a.cliente_id

LEFT JOIN aluguel_itens ai
    ON ai.aluguel_id = a.id

GROUP BY
    a.id,
    a.cliente_id,
    c.nome,
    a.fecha_salida,
    a.fecha_retorno,
    a.estado,
    a.observacoes,
    a.usuario_id,
    a.created_at

ORDER BY a.id DESC;
  `, [req.user.cliente_id])

      return res.json(rows)

    }
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
    a.created_at,

    COUNT(DISTINCT ai.equipamento_id) AS total_equipamentos,

    (
        SELECT COUNT(*)
        FROM complementos cp
        WHERE cp.aluguel_id = a.id
    ) AS total_complementos

FROM alugueis a

LEFT JOIN clientes c
    ON c.id = a.cliente_id

LEFT JOIN aluguel_itens ai
    ON ai.aluguel_id = a.id

GROUP BY
    a.id,
    a.cliente_id,
    c.nome,
    a.fecha_salida,
    a.fecha_retorno,
    a.estado,
    a.observacoes,
    a.usuario_id,
    a.created_at

ORDER BY a.id DESC;
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

      await registrarHistoricoEquipamento(
        equipamentoId,
        'disponivel',
        'alugado',
        `Saída para aluguel #${aluguelId}`,
        usuario_id
      )

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
export const getAluguelById = async (req,res) => {
try{
  const { id } = req.params

  const [aluguel] = await db.query(`
    SELECT
      a.*,
      c.nome as cliente,
      c.telefone,
      c.email
    FROM alugueis a
    LEFT JOIN clientes c
      ON c.id = a.cliente_id
    WHERE a.id = ?
  `,[id])

  const [equipamentos] = await db.query(`
    SELECT
      e.equipamento_id,
      e.codigo_interno,
      e.marca,
      e.modelo,
      e.estado_actual
    FROM aluguel_itens ai
    INNER JOIN equipos e
      ON e.equipamento_id = ai.equipamento_id
    WHERE ai.aluguel_id = ?
  `,[id])

  const [complementos] = await db.query(`
SELECT
    a.id,
    a.cliente_id,
    c.nome AS cliente,
    a.fecha_salida,
    a.fecha_retorno,
    a.estado,
    a.observacoes,
    a.usuario_id,
    a.created_at,

    COUNT(DISTINCT ai.equipamento_id) AS total_equipamentos,

    (
        SELECT COUNT(*)
        FROM complementos cp
        WHERE cp.aluguel_id = a.id
    ) AS total_complementos

FROM alugueis a

LEFT JOIN clientes c
    ON c.id = a.cliente_id

LEFT JOIN aluguel_itens ai
    ON ai.aluguel_id = a.id

GROUP BY
    a.id,
    a.cliente_id,
    c.nome,
    a.fecha_salida,
    a.fecha_retorno,
    a.estado,
    a.observacoes,
    a.usuario_id,
    a.created_at

ORDER BY a.id DESC;
  `, [id])

  res.json({
    ...aluguel[0],
    equipamentos,
    complementos
  })

}catch(error){
  console.error(error)
  res.status(500).json({
    error: error.message
    })
  }
}
export const getAluguelDetalhes = async (req, res) => {

  const { id } = req.params

  try {

    const [aluguel] = await db.query(`
      SELECT
        a.*,
        c.nome AS cliente
      FROM alugueis a
      LEFT JOIN clientes c
      ON c.id = a.cliente_id
      WHERE a.id = ?
    `,[id])

    const [equipamentos] = await db.query(`
      SELECT
        e.equipamento_id,
        e.codigo_interno,
        e.marca,
        e.modelo,
        e.estado_actual
      FROM aluguel_itens ai
      INNER JOIN equipos e
        ON e.equipamento_id = ai.equipamento_id
      WHERE ai.aluguel_id = ?
    `,[id])

    res.json({
      ...aluguel[0],
      equipamentos
    })

  } catch(error) {

    console.error(error)

    res.status(500).json({
      error:error.message
    })

  }

}
export const deleteAluguel = async (req, res) => {
  try {

    const { id } = req.params

    const [equipamentos] = await db.query(`
      SELECT equipamento_id
      FROM aluguel_itens
      WHERE aluguel_id = ?
    `, [id])

    for (const item of equipamentos) {

      await registrarHistoricoEquipamento(
        item.equipamento_id,
        'alugado',
        'disponivel',
        `Aluguel #${id} excluído`,
        1
      )

      await db.query(`
        UPDATE equipos
        SET estado_actual = 'disponivel'
        WHERE equipamento_id = ?
      `, [item.equipamento_id])

    }

    await db.query(`
      DELETE FROM aluguel_itens
      WHERE aluguel_id = ?
    `, [id])

    await db.query(`
      DELETE FROM alugueis
      WHERE id = ?
    `, [id])

    res.json({
      success: true
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error: error.message
    })

  }
}

export const atualizarAluguel = async (req, res) => {
  try {

    const { id } = req.params

    const {
      cliente_id,
      fecha_salida,
      fecha_retorno,
      observacoes,
      equipamentos,
      usuario_id = 1
    } = req.body

    await db.query(`
      UPDATE alugueis
      SET
        cliente_id = ?,
        fecha_salida = ?,
        fecha_retorno = ?,
        observacoes = ?
      WHERE id = ?
    `, [
      cliente_id,
      fecha_salida,
      fecha_retorno,
      observacoes,
      id
    ])

    const [equiposAnteriores] = await db.query(`
      SELECT equipamento_id
      FROM aluguel_itens
      WHERE aluguel_id = ?
    `, [id])

    const idsAnteriores = equiposAnteriores.map(
      item => item.equipamento_id
    )

    const idsNuevos = equipamentos || []

    const removidos = idsAnteriores.filter(
      item => !idsNuevos.includes(item)
    )

    const adicionados = idsNuevos.filter(
      item => !idsAnteriores.includes(item)
    )

    // EQUIPOS REMOVIDOS
    for (const equipamentoId of removidos) {

      await db.query(`
        UPDATE equipos
        SET estado_actual = 'disponivel'
        WHERE equipamento_id = ?
      `, [equipamentoId])

      await registrarHistoricoEquipamento(
        equipamentoId,
        'alugado',
        'disponivel',
        `Removido do aluguel #${id}`,
        usuario_id
      )

    }

    // EQUIPOS AGREGADOS
    for (const equipamentoId of adicionados) {

      await db.query(`
        UPDATE equipos
        SET estado_actual = 'alugado'
        WHERE equipamento_id = ?
      `, [equipamentoId])

      await registrarHistoricoEquipamento(
        equipamentoId,
        'disponivel',
        'alugado',
        `Adicionado ao aluguel #${id}`,
        usuario_id
      )

    }

    await db.query(`
      DELETE FROM aluguel_itens
      WHERE aluguel_id = ?
    `, [id])

    for (const equipamentoId of idsNuevos) {

      await db.query(`
        INSERT INTO aluguel_itens (
          aluguel_id,
          equipamento_id
        )
        VALUES (?, ?)
      `, [
        id,
        equipamentoId
      ])

    }

    res.json({
      success: true
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error: error.message
    })

  }
}
