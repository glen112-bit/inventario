import db from '../config/db.js'

// =====================
// GET MARCAS
// =====================

export const getMarcas = async (req, res) => {

  try {

    const [rows] = await db.query(`
      SELECT *
      FROM marcas
      ORDER BY nome
    `)

    res.json(rows)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error: error.message
    })

  }

}
// =====================
// GET CATEGORIAS
// =====================

export const getCategorias = async (req, res) => {

  try {

    const [rows] = await db.query(`
      SELECT *
      FROM categorias
      ORDER BY nome
    `)

    res.json(rows)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error: error.message
    })

  }

}
// =====================
// UPDATE CATEGORIAS
//
export const updateCategoria = async (
  req,
  res
) => {

  const { id } = req.params

  const {
    nome,
    descricao
  } = req.body

  try {

    await db.query(
      `
      UPDATE categorias
      SET
        nome = ?,
        descricao = ?
      WHERE id = ?
      `,
      [
        nome,
        descricao,
        id
      ]
    )

    res.json({
      success: true,
      message: 'Categoria atualizada'
    })

  } catch(error) {

    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar categoria'
    })

  }

}
// =====================
// GET LOCALIZACOES
// =====================

export const getLocalizacoes = async (req, res) => {

  try {

    const [rows] = await db.query(`
      SELECT localizacao
      FROM equipos
    `)

    res.json(rows)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error: error.message
    })

  }

}
// =====================
// CREATE MARCA
// =====================

export const createMarca = async (req, res) => {

  try {

    const { nome } = req.body

    const [result] = await db.query(`
      INSERT INTO marcas (
        nome
      )
      VALUES (?)
    `, [
      nome
    ])

    res.status(201).json({
      id: result.insertId,
      message: 'Marca criada com sucesso'
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error: error.message
    })

  }

}

// =====================
// UPDATE MARCA
// =====================

export const updateMarca = async (req, res) => {

  try {

    const { id } = req.params
    const { nome } = req.body

    await db.query(`
      UPDATE marcas
      SET nome = ?
      WHERE id = ?
    `, [
      nome,
      id
    ])

    res.json({
      success: true,
      message: 'Marca atualizada'
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error: error.message
    })

  }

}

// =====================
// DELETE MARCA
// =====================

export const deleteMarca = async (req, res) => {

  try {

    const { id } = req.params

    await db.query(`
      DELETE FROM marcas
      WHERE id = ?
    `, [
      id
    ])

    res.json({
      success: true,
      message: 'Marca removida'
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error: error.message
    })

  }

}

export const atualizarEstadoEquipamento = async (req,res) => {

    try {

    const { id } = req.params

    const {
      estado_actual,
      observacao
    } = req.body

    await db.query(`
      UPDATE equipos
      SET estado_actual = ?
      WHERE equipamento_id = ?
    `,[
      estado_actual,
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
export const getHistoricoEquipamento = async (req,res) => {

  try {

    const { id } = req.params

    const [rows] = await db.query(`
      SELECT
        h.*,
        u.nome AS usuario
      FROM historico_equipamentos h
      LEFT JOIN usuarios u
        ON u.id = h.usuario_id
      WHERE h.equipamento_id = ?
      ORDER BY h.created_at DESC
    `,[id])

    res.json(rows)

  } catch(error) {

    console.error(error)

    res.status(500).json({
      error:error.message
    })

  }

}
export const createCategoria = async (req,res) => {

  try {

    const { categoria } = req.body

    const [result] = await db.query(`
      INSERT INTO categorias (
        nome,
        descricao
      )
      VALUES (?, ?)
    `, [
      categoria,
      ''
    ])

    res.status(201).json({
      success: true,
      id: result.insertId
    })

  } catch(error){

    console.error(error)

    res.status(500).json({
      error: error.message
    })

  }

}
