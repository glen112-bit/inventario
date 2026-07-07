import db from '../config/db.js'
import {
  registrarHistoricoEquipamento
} from './equipos.controller.js'

export const getComplementosByAluguel = async (req, res) => {
  try {

    const { id } = req.params

    const [complementos] = await db.query(`
      SELECT *
      FROM complementos
      WHERE aluguel_id = ?
      ORDER BY created_at DESC
    `, [id])

    for (const complemento of complementos) {

      const [equipamentos] = await db.query(`
        SELECT
          e.equipamento_id,
          e.codigo_interno,
          e.marca,
          e.modelo,
          e.estado_actual
        FROM complemento_itens ci
        INNER JOIN equipos e
          ON e.equipamento_id = ci.equipamento_id
        WHERE ci.complemento_id = ?
      `, [complemento.id])

      complemento.equipamentos = equipamentos

    }

    res.json(complementos)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error: error.message
    })

  }
}

export const getComplementoById = async(req, res) => {
  try{
    const { id } = req.params

    const [[complemento]] = await db.query(`
    SELECT *
    FROM complementos
    WHERE id = ?
    `, [id])
    if( !complemento ) {
      return res.status(404).json({
        error: 'Complemento não encontrado'
      })
    }
    const [equipamentos] = await db.query(`
    SELECT
    e.*
    FROM complemento_itens si
    INNER JOIN equipos e 
    ON e.equipamento_id = si.equipamento_id
    WHERE si.complemento_id = ?
    `, [id])
    res.json({
      ...complemento,
      equipamentos
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
console.log('nuevo complemento')
    const [result] = await db.query(`
INSERT INTO complementos(
  aluguel_id,
  fecha_salida,
  fecha_retorno,
  observacoes,
  usuario_id
)
VALUES (?, ?, ?, ?, ?)
`,[
  aluguel_id,
  fecha_salida,
  fecha_retorno,
  observacoes || null,
  usuario_id
])
    const complementoId = result.insertId

    for(const equipamentoId of equipamentos) {
      await db.query(`
      INSERT INTO complemento_itens (
      complemento_id,
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
        `Complemento #${complementoId}`,
        usuario_id
      )
    }
    res.status(201).json({
      success: true,
      complementoId
    })
  } catch(error){
    console.error(error)
    res.status(500).json({
      error: error.message
    })
  }
}

export const updateComplemento = async (req, res) => {
  try{
    const { id } = req.params
    const{
      fecha_salida,
      fecha_retorno,
      observacoes,
      equipamentos = [],
      usuario_id
    } = req.body
    await db.query(`
    UPDATE complementos
    SET
    fecha_salida = ?,
    fecha_retorno = ?,
    observacoes = ?
    WHERE id = ?
    `,[
      fecha_salida,
      fecha_retorno,
      observacoes,
      id
    ])
    const [anteriores] = await db.query(`
    SELECT equipamento_id
    FROM complemento_itens
    WHERE complemento_id = ?
    `, [id])
    const idsAntigos = anteriores.map(
      item => item.equipamento_id
    )
    const removidos = idsAntigos.filter(
      item => !equipamentos.includes(item)
    )
    const adicionados = equipamentos.filter(
      item => !idsAntigos.includes(item)
    )
    for( const equipamentoId of removidos ) {
      await db.query(`
      UPDATE equipos
      SET estado_actual = 'disponivel'
      WHERE equipamento_id = ?
      `, [equipamentoId])
      await registrarHistoricoEquipamento(
        equipamentoId,
        'alugado',
        'disponivel',
        `Removido do Suplemento #${id}`,
        usuario_id
      )
    }

    for(const equipamentoId of adicionados) {
      await db.query(`
      UPDATE equipos
      SET estado_actual = 'alugado'
      WHERE equipamento_id = ?
      `, [equipamentoId])
      await registrarHistoricoEquipamento(
        equipamentoId,
        'disponivel',
        'alugado',
        `Adicionado ao Suplemento #${id}`,
        usuario_id
      )
    }
    await db.query(`
    DELETE FROM complemento_itens
    WHERE complemento_id = ?
    `, [id])
    for( const equipamentoId of equipamentos ) {
      await db.query(`
      INSERT INTO complemento_itens (
      complemento_id,
      equipamento_id
      )
      VALUES(?, ?)
      `,[
        id,
        equipamentoId
      ])
    }
    res.json({
      success:true
    })
  }catch (error) {
    console.error(error)
    res.status(500).json({
      error: error.message
    })
  }
}

export const finalizarComplemento = async(req, res) => {
  try{
    const { id } = req.params

    const[equipamentos] = await db.query(`
      SELECT equipamento_id
      FROM complemento_itens
      WHERE complemento_id = ?
    `, [id])
    for(const item of equipamntos) {
      await db.query(`
      UPDATE equipos
      SET estado_actual = 'disponivel'
      WHERE equipamento_id = ?
      `, [item.equipamento_id])
      await registrarHistoricoEquipamento(
        item.equipamento_id,
        'alugado',
        'disponivel',
        `Retorno do complemento #${id}`,
        1
      )
    }
    await db.query(`
    UPDATE complementos
    SET estado = 'retornado'
    WHERE id = ?
    `, [id])
    res.json({
      success: true
    })
  }catch(error){
    console.error(error)
    res.ststus(500).json({
      error:error.message
    })
  }
}

export const deleteComplemento = async(req, res) => {
  try{
    const { id } = req.params

    const[equipamentos] = await db.query(`
      SELECT equipamento_id
      FROM complemento_itens
      WHERE complemento_id = ?   
    `, [id])

    for( const item of equipamntos ) {
      await db.query(`
        UPDATE equipos
        SET estado_actual = 'disponivel'
        WHERE equipamento_id = ?
      `, [item.equipamento_id])
    }
for (const equipamentoId of removidos) {

  await db.query(`
    DELETE FROM complemento_itens
    WHERE complemento_id = ?
      AND equipamento_id = ?
  `, [
    id,
    equipamentoId
  ])

}
    await db.query(`
    DELETE FROM complementos
    WHERE id = ?
    `, [id])
    res.json({
      success: true
    })
  }catch(error){
    console.error(error)
    res.status(500).json({
      error: error.message
    })
  }
}
