import db from '../config/db.js'


// =====================================================
// ORGANIZAÇÃO DO USUÁRIO
// =====================================================

const getOrganizacaoId = (req) => {
  return req.user?.organizacao_id || null
}


// =====================================================
// GET MARCAS
// =====================================================

export const getMarcas = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT *
      FROM marcas
      ORDER BY nome
    `)

    res.json(rows)

  } catch (error) {
    console.error('ERRO GET MARCAS:', error)

    res.status(500).json({
      error: error.message
    })
  }
}


// =====================================================
// GET CATEGORIAS
// =====================================================

export const getCategorias = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT *
      FROM categorias
      ORDER BY nome
    `)

    res.json(rows)

  } catch (error) {
    console.error('ERRO GET CATEGORIAS:', error)

    res.status(500).json({
      error: error.message
    })
  }
}


// =====================================================
// UPDATE CATEGORIA
// =====================================================

export const updateCategoria = async (req, res) => {

  try {

    const { id } = req.params

    const {
      nome,
      descricao
    } = req.body

    const organizacaoId = getOrganizacaoId(req)

    if (!organizacaoId) {
      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })
    }

    const [result] = await db.query(`
      UPDATE categorias

      SET
        nome = ?,
        descricao = ?

      WHERE id = ?

        AND organizacao_id = ?
    `, [
      nome,
      descricao,
      id,
      organizacaoId
    ])

    if (result.affectedRows === 0) {

      return res.status(404).json({
        error: 'Categoria não encontrada.'
      })

    }

    res.json({
      success: true,
      message: 'Categoria atualizada'
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      success: false,
      message: error.message
    })

  }

}


// =====================================================
// GET LOCALIZAÇÕES
// =====================================================

export const getLocalizacoes = async (req, res) => {

  try {

    const organizacaoId = getOrganizacaoId(req)

    if (!organizacaoId) {
      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })
    }

    const [rows] = await db.query(`
      SELECT DISTINCT
        localizacao

      FROM equipos

      WHERE organizacao_id = ?

      ORDER BY localizacao
    `, [
      organizacaoId
    ])

    res.json(rows)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error: error.message
    })

  }

}


// =====================================================
// CREATE MARCA
// =====================================================

export const createMarca = async (req, res) => {

  try {

    const { nome } = req.body

    const organizacaoId = getOrganizacaoId(req)

    if (!organizacaoId) {
      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })
    }

    if (!nome?.trim()) {
      return res.status(400).json({
        error: 'Nome da marca é obrigatório.'
      })
    }

    const [result] = await db.query(`
      INSERT INTO marcas (
        nome,
        organizacao_id
      )

      VALUES (?, ?)
    `, [
      nome.trim(),
      organizacaoId
    ])

    res.status(201).json({

      success: true,

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


// =====================================================
// UPDATE MARCA
// =====================================================

export const updateMarca = async (req, res) => {

  try {

    const { id } = req.params

    const { nome } = req.body

    const organizacaoId = getOrganizacaoId(req)

    if (!organizacaoId) {
      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })
    }

    const [result] = await db.query(`
      UPDATE marcas

      SET nome = ?

      WHERE id = ?

        AND organizacao_id = ?
    `, [
      nome,
      id,
      organizacaoId
    ])

    if (result.affectedRows === 0) {

      return res.status(404).json({
        error: 'Marca não encontrada.'
      })

    }

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


// =====================================================
// DELETE MARCA
// =====================================================

export const deleteMarca = async (req, res) => {

  try {

    const { id } = req.params

    const organizacaoId = getOrganizacaoId(req)

    if (!organizacaoId) {
      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })
    }

    const [result] = await db.query(`
      DELETE FROM marcas

      WHERE id = ?

        AND organizacao_id = ?
    `, [
      id,
      organizacaoId
    ])

    if (result.affectedRows === 0) {

      return res.status(404).json({
        error: 'Marca não encontrada.'
      })

    }

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


// =====================================================
// ATUALIZAR ESTADO EQUIPAMENTO
// =====================================================

export const atualizarEstadoEquipamento = async (
  req,
  res
) => {

  try {

    const { id } = req.params

    const {
      estado_actual,
      observacao
    } = req.body

    const organizacaoId = getOrganizacaoId(req)

    const usuarioId = req.user?.id

    if (!organizacaoId) {
      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })
    }

    const [result] = await db.query(`
      UPDATE equipos

      SET estado_actual = ?

      WHERE equipamento_id = ?

        AND organizacao_id = ?
    `, [
      estado_actual,
      id,
      organizacaoId
    ])

    if (result.affectedRows === 0) {

      return res.status(404).json({
        error: 'Equipamento não encontrado.'
      })

    }

    /*
    ====================================================
    REGISTRAR HISTÓRICO
    ====================================================
    */

    if (observacao) {

      await db.query(`
        INSERT INTO historico_equipamentos (
          equipamento_id,
          estado_novo,
          observacao,
          usuario_id,
          tipo_evento
        )

        VALUES (?, ?, ?, ?, 'edicao')
      `, [
        id,
        estado_actual,
        observacao,
        usuarioId
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


// =====================================================
// HISTÓRICO EQUIPAMENTO
// =====================================================

export const getHistoricoEquipamento = async (
  req,
  res
) => {

  try {

    const { id } = req.params

    const organizacaoId = getOrganizacaoId(req)

    if (!organizacaoId) {
      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })
    }

    /*
    Primeiro verificar se o equipamento
    pertence à organização.
    */

    const [[equipamento]] = await db.query(`
      SELECT equipamento_id

      FROM equipos

      WHERE equipamento_id = ?

        AND organizacao_id = ?

      LIMIT 1
    `, [
      id,
      organizacaoId
    ])

    if (!equipamento) {

      return res.status(404).json({
        error: 'Equipamento não encontrado.'
      })

    }

    const [rows] = await db.query(`
      SELECT

        h.*,

        u.nome AS usuario

      FROM historico_equipamentos h

      LEFT JOIN usuarios u
        ON u.id = h.usuario_id

      WHERE h.equipamento_id = ?

      ORDER BY h.created_at DESC
    `, [
      id
    ])

    res.json(rows)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error: error.message
    })

  }

}


// =====================================================
// CREATE CATEGORIA
// =====================================================

export const createCategoria = async (
  req,
  res
) => {

  try {

    const {
      categoria,
      nome,
      descricao = ''
    } = req.body

    const nomeCategoria =
      categoria || nome

    const organizacaoId = getOrganizacaoId(req)

    if (!organizacaoId) {
      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })
    }

    if (!nomeCategoria?.trim()) {

      return res.status(400).json({
        error: 'Nome da categoria é obrigatório.'
      })

    }

    const [result] = await db.query(`
      INSERT INTO categorias (

        nome,

        descricao,

        organizacao_id

      )

      VALUES (?, ?, ?)
    `, [
      nomeCategoria.trim(),

      descricao,

      organizacaoId
    ])

    res.status(201).json({

      success: true,

      id: result.insertId

    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error: error.message
    })

  }

}
