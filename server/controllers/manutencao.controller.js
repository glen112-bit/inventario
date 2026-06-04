import db from '../config/db.js'



export const getManutencao = async (req,res) => {

  try {

    const { id } = req.params

    const [[row]] = await db.query(`
      SELECT *
      FROM equipos
      WHERE estado_actual = 'manutencao'
    `,[id])

    res.json(row)

  } catch(error) {

    console.error(error)

    res.status(500).json({
      error:error.message
    })

  }

}

export const getManutencoes = async (req,res) => {

  try {

    const [rows] = await db.query(`
      SELECT
        equipamento_id,
        codigo_interno,
        marca,
        modelo,
        estado_actual,
        valor
      FROM equipos
      WHERE estado_actual = 'manutencao'
      ORDER BY codigo_interno
    `)

    res.json(rows)

  } catch(error) {

    console.error(error)

    res.status(500).json({
      error:error.message
    })

  }

}
export const createManutencao = async (req,res) => {

  try {

    const {
      equipamento_id,
      prioridade,
      problema
    } = req.body

    const [result] = await db.query(`
      INSERT INTO equipos (
        equipamento_id,
        prioridade,
        problema
      )
      VALUES (?,?,?)
    `,[
      equipamento_id,
      prioridade,
      problema
    ])

    await db.query(`
      UPDATE equipos
      SET estado_actual = 'manutencao'
      WHERE equipamento_id = ?
    `,[equipamento_id])

    res.json({
      id:result.insertId
    })

  } catch(error) {

    console.error(error)

    res.status(500).json({
      error:error.message
    })

  }

}

export const updateManutencao = async (req,res) => {

  try {

    const { id } = req.params

    const {
      prioridade,
      status,
      problema,
      diagnostico,
      solucao,
      custo,
      data_saida
    } = req.body

    await db.query(`
      UPDATE equipos 
      SET
        prioridade = ?,
        status = ?,
        problema = ?,
        diagnostico = ?,
        solucao = ?,
        custo = ?,
        data_saida = ?
      WHERE id = ?
    `,[
      prioridade,
      status,
      problema,
      diagnostico,
      solucao,
      custo,
      data_saida,
      id
    ])

    res.json({
      success:true
    })

  } catch(error) {

    console.error(error)

    res.status(500).json({
      error:error.message
    })

  }

}

export const deleteManutencao = async (req,res) => {

  try {

    const { id } = req.params

    await db.query(`
      DELETE FROM equipos 
      WHERE id = ?
    `,[id])

    res.json({
      success:true
    })

  } catch(error){

    console.error(error)

    res.status(500).json({
      error:error.message
    })

  }

}
