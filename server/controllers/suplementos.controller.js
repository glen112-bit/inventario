import db from '../config/db.js'
import {
  registrarHistoricoEquipamento
} from 'equipos.controller.js'

export const getComplementosByAluguel = async( req, res ) => {
  try{
    const { id } = req.params
    const [ rows ] = await db.query(`
    SELECT
      s.*
    FROM suplemetos s 
    WHERE s.aluguel_id = ?
    ORDER BY s.created_at DESC
    `, [id])
    res.json(rows)
  } catch(error){
    console.error(error)
    res.status(500)({
      error: error.message
    })
  }
}

export const getComplementoById = async(req, res) => {
  try{
    const { id } req.params

    const [[complemento]] = await db.query(`
    SELECT *
    FROM suplemetos
    WHERE id = ?
    `, [id])
    if( !complemento ) {
      return res.status(404).json({
        error: 'Complemento não encontrado'
      })
    }
    const [equipamntos] = await db.query(`
    SELECT
    e.*
    FROM suplemento_itens si
    INNER JOIN equipos e 
    ON e.equipamento_id = si.equipamento_id
    WHERE si.suplemento_id = ?
    `, [id])
    res.json({
      ...complemento,
      equipamntos
    })
  } catch(error){
    console.error(error)
    return res.status(500).json({
      error: error.message
    })
  }
}

export const createComplemento = async(req, res) => {
  try{
    const{
      aluguel_id,
      fecha_salida,
      fecha_retorno,
      observacoes,
      usuario_id,
      equipamentos
    } = req.body
    const [result] await db.query(`
    INSERT INTO complementos(
    aluguel_id,
    fecha_salida,
    fecha_retorno,
    estado,
    observacoes,
    usuario_id
    )
    VALUES(?, ?, ?, ?, ?, ?,)
    `,[
      aluguel_id,
      fecha_salida,
      fecha_retorno,
      'ativo',
      observacoes || null,
      usuario_id
    ])
    const complementoId = result.insertId

    for(const equipamentoId of equipamentos) {
      await db.query(`
      INSERT INTO suplemento_itens (
      suplemento_id,
      equipamento_id
      )
      VALUES(?, ?)
      `,[
        complementoId,
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
        Complemento #${suplementoId}
      )
    }
  }
}
