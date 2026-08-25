import db from '../config/db.js'


// ======================================================
// GET EQUIPAMENTOS EM MANUTENÇÃO
// ======================================================

export const getManutencoes = async (req, res) => {

  try {

    const organizacaoId = req.user?.organizacao_id

    console.log('========== GET MANUTENÇÕES ==========')
    console.log('USER:', req.user)
    console.log('ORGANIZAÇÃO:', organizacaoId)

    if (!organizacaoId) {

      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })

    }

    const [rows] = await db.query(`
      SELECT
        equipamento_id,
        codigo_interno,
        numero_serie,
        marca,
        modelo,
        descripcion,
        estado_actual,
        valor,
        fecha_compra,
        localizacao,
        organizacao_id
      FROM equipos
      WHERE organizacao_id = ?
        AND (
          estado_actual = 'manutencao'
          OR estado_actual = 'mantenimiento'
        )
      ORDER BY codigo_interno ASC
    `, [
      organizacaoId
    ])

    console.log(
      'EQUIPAMENTOS ENCONTRADOS:',
      rows.length
    )

    console.log(
      'DADOS:',
      rows
    )

    res.json(rows)

  } catch (error) {

    console.error(
      'GET MANUTENÇÕES ERROR:',
      error
    )

    res.status(500).json({
      error: error.message
    })

  }

}


// ======================================================
// GET UMA MANUTENÇÃO
// ======================================================

export const getManutencao = async (req, res) => {

  try {

    const { id } = req.params

    const organizacaoId =
      req.user?.organizacao_id

    if (!organizacaoId) {

      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })

    }

    const [[row]] = await db.query(`
      SELECT
        equipamento_id,
        codigo_interno,
        numero_serie,
        marca,
        modelo,
        descripcion,
        estado_actual,
        valor,
        fecha_compra,
        localizacao,
        organizacao_id
      FROM equipos
      WHERE equipamento_id = ?
        AND organizacao_id = ?
        AND (
          estado_actual = 'manutencao'
          OR estado_actual = 'mantenimiento'
        )
    `, [
      id,
      organizacaoId
    ])

    if (!row) {

      return res.status(404).json({
        error: 'Equipamento não encontrado em manutenção.'
      })

    }

    res.json(row)

  } catch (error) {

    console.error(
      'GET MANUTENÇÃO ERROR:',
      error
    )

    res.status(500).json({
      error: error.message
    })

  }

}


// ======================================================
// CREATE MANUTENÇÃO
// ======================================================

export const createManutencao = async (req, res) => {

  try {

    const organizacaoId =
      req.user?.organizacao_id

    const {
      equipamento_id,
      prioridade,
      problema
    } = req.body

    if (!organizacaoId) {

      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })

    }

    if (!equipamento_id) {

      return res.status(400).json({
        error: 'Equipamento não informado.'
      })

    }

    const [[equipamento]] = await db.query(`
      SELECT equipamento_id
      FROM equipos
      WHERE equipamento_id = ?
        AND organizacao_id = ?
    `, [
      equipamento_id,
      organizacaoId
    ])

    if (!equipamento) {

      return res.status(404).json({
        error: 'Equipamento não encontrado.'
      })

    }

    /*
     * IMPORTANTE:
     * Não fazemos INSERT em equipos.
     * O equipamento já existe.
     */

    await db.query(`
      UPDATE equipos
      SET estado_actual = 'manutencao'
      WHERE equipamento_id = ?
        AND organizacao_id = ?
    `, [
      equipamento_id,
      organizacaoId
    ])

    res.status(201).json({
      success: true,
      equipamento_id
    })

  } catch (error) {

    console.error(
      'CREATE MANUTENÇÃO ERROR:',
      error
    )

    res.status(500).json({
      error: error.message
    })

  }

}


// ======================================================
// UPDATE MANUTENÇÃO
// ======================================================

export const updateManutencao = async (req, res) => {

  try {

    const { id } = req.params

    const organizacaoId =
      req.user?.organizacao_id

    const {
      estado_actual
    } = req.body

    if (!organizacaoId) {

      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })

    }

    await db.query(`
      UPDATE equipos
      SET estado_actual = ?
      WHERE equipamento_id = ?
        AND organizacao_id = ?
    `, [
      estado_actual || 'manutencao',
      id,
      organizacaoId
    ])

    res.json({
      success: true
    })

  } catch (error) {

    console.error(
      'UPDATE MANUTENÇÃO ERROR:',
      error
    )

    res.status(500).json({
      error: error.message
    })

  }

}


// ======================================================
// DELETE / FINALIZAR MANUTENÇÃO
// ======================================================

export const deleteManutencao = async (req, res) => {

  try {

    const { id } = req.params

    const organizacaoId =
      req.user?.organizacao_id

    if (!organizacaoId) {

      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })

    }

    await db.query(`
      UPDATE equipos
      SET estado_actual = 'disponivel'
      WHERE equipamento_id = ?
        AND organizacao_id = ?
    `, [
      id,
      organizacaoId
    ])

    res.json({
      success: true
    })

  } catch (error) {

    console.error(
      'DELETE MANUTENÇÃO ERROR:',
      error
    )

    res.status(500).json({
      error: error.message
    })

  }

}
