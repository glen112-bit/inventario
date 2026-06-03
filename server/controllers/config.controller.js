import db from '../config/db.js'

// =====================
// GET MARCAS
// =====================

export const getMarcas = async (req, res) => {

  try {

    const [rows] = await db.query(`
      SELECT *
      FROM marcas
      ORDER BY nombre
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
      ORDER BY nombre
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
// GET LOCALIZACOES
// =====================

export const getLocalizacoes = async (req, res) => {

  try {

    const [rows] = await db.query(`
      SELECT *
      FROM ubicaciones
      ORDER BY nombre
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

    const { nombre } = req.body

    const [result] = await db.query(`
      INSERT INTO marcas (
        nombre
      )
      VALUES (?)
    `, [
      nombre
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
    const { nombre } = req.body

    await db.query(`
      UPDATE marcas
      SET nombre = ?
      WHERE id = ?
    `, [
      nombre,
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

export const atualizarEstadoEquipamento = async (req, res) => {

  try {

    const { id } = req.params

    const {
      estado_actual,
      observacao
    } = req.body

    const [equipamento] = await db.query(`
      SELECT
        equipamento_id,
        estado_actual
      FROM equipamentos
      WHERE equipamento_id = ?
    `, [id])

    if (equipamento.length === 0) {

      return res.status(404).json({
        error: 'Equipamento não encontrado'
      })

    }

    const estadoAnterior =
      equipamento[0].estado_actual

    await db.query(`
      UPDATE equipos
      SET estado_actual = ?
      WHERE equipamento_id = ?
    `, [
      estado_actual,
      id
    ])

    try {

      await db.query(`
        INSERT INTO historico_estados (
          equipamento_id,
          estado_anterior,
          estado_novo,
          observacao
        )
        VALUES (?, ?, ?, ?)
      `, [
        id,
        estadoAnterior,
        estado_actual,
        observacao || null
      ])

    } catch {

      console.log(
        'Tabela historico_estados não encontrada'
      )

    }

    res.json({
      success: true,
      message: 'Estado atualizado'
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error: error.message
    })

  }

}
