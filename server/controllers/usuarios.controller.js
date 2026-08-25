import bcrypt from 'bcryptjs'
import db from '../config/db.js'


// =====================================================
// GET USUARIOS
// =====================================================

export const getUsuarios = async (req, res) => {

  try {

    const organizacaoId = req.user?.organizacao_id

    let query = `
      SELECT
        id,
        nome,
        email,
        telefone,
        rol,
        activo,
        organizacao_id,
        created_at
      FROM usuarios
    `

    const params = []

    // Si el usuario pertenece a una organización,
    // solamente devuelve usuarios de esa organización.
    if (organizacaoId) {
      query += `
        WHERE organizacao_id = ?
      `
      params.push(organizacaoId)
    }

    query += `
      ORDER BY nome
    `

    const [rows] = await db.query(
      query,
      params
    )

    res.json(rows)

  } catch (error) {

    console.error(
      'ERRO GET USUARIOS:',
      error
    )

    res.status(500).json({
      error: error.message
    })

  }

}


// =====================================================
// REGISTRO
// =====================================================

export const registerUser = async (req, res) => {

  try {

    const {
      nome,
      email,
      telefone,
      password
    } = req.body

    if (!nome || !email || !password) {

      return res.status(400).json({
        success: false,
        message: 'Nome, e-mail e senha são obrigatórios.'
      })

    }

    const [existe] = await db.query(`
      SELECT id
      FROM usuarios
      WHERE email = ?
    `, [email])

    if (existe.length > 0) {

      return res.status(409).json({
        success: false,
        message: 'Este e-mail já está cadastrado.'
      })

    }

    const senhaHash = await bcrypt.hash(
      password,
      10
    )

    const [result] = await db.query(`
      INSERT INTO usuarios (
        nome,
        email,
        telefone,
        password,
        rol,
        activo
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      nome,
      email,
      telefone || null,
      senhaHash,
      'usuario',
      1
    ])

    const [[usuario]] = await db.query(`
      SELECT
        id,
        nome,
        email,
        telefone,
        rol,
        activo,
        organizacao_id,
        created_at
      FROM usuarios
      WHERE id = ?
    `, [result.insertId])

    res.status(201).json({
      success: true,
      message: 'Usuário registrado com sucesso.',
      usuario
    })

  } catch (error) {

    console.error(
      'ERRO REGISTER USER:',
      error
    )

    res.status(500).json({
      success: false,
      error: error.message
    })

  }

}


// =====================================================
// CREATE USUARIO
// =====================================================

export const createUsuario = async (req, res) => {

  try {

    const {
      nome,
      email,
      telefone,
      password,
      rol = 'tecnico',
      activo = true
    } = req.body

    if (!nome || !email || !password) {

      return res.status(400).json({
        error: 'Nome, e-mail e senha são obrigatórios'
      })

    }

    const [existe] = await db.query(`
      SELECT id
      FROM usuarios
      WHERE email = ?
    `, [email])

    if (existe.length > 0) {

      return res.status(400).json({
        error: 'Já existe um usuário com esse e-mail'
      })

    }

    const organizacaoId =
      req.user?.organizacao_id || null

    const senhaHash = await bcrypt.hash(
      password,
      10
    )

    const [result] = await db.query(`
      INSERT INTO usuarios (
        nome,
        email,
        telefone,
        password,
        rol,
        activo,
        organizacao_id
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      nome,
      email,
      telefone || null,
      senhaHash,
      rol,
      activo ? 1 : 0,
      organizacaoId
    ])

    const [[usuario]] = await db.query(`
      SELECT
        id,
        nome,
        email,
        telefone,
        rol,
        activo,
        organizacao_id,
        created_at
      FROM usuarios
      WHERE id = ?
    `, [result.insertId])

    res.status(201).json({
      success: true,
      usuario
    })

  } catch (error) {

    console.error(
      'ERRO CREATE USUARIO:',
      error
    )

    res.status(500).json({
      error: error.message
    })

  }

}


// =====================================================
// UPDATE USUARIO
// =====================================================

export const updateUsuario = async (req, res) => {

  try {

    const { id } = req.params

    const {
      nome,
      email,
      telefone,
      rol,
      activo
    } = req.body

    const organizacaoId =
      req.user?.organizacao_id

    let result

    if (organizacaoId) {

      ;[result] = await db.query(`
        UPDATE usuarios
        SET
          nome = ?,
          email = ?,
          telefone = ?,
          rol = ?,
          activo = ?
        WHERE id = ?
        AND organizacao_id = ?
      `, [
        nome,
        email,
        telefone,
        rol,
        activo ? 1 : 0,
        id,
        organizacaoId
      ])

    } else {

      ;[result] = await db.query(`
        UPDATE usuarios
        SET
          nome = ?,
          email = ?,
          telefone = ?,
          rol = ?,
          activo = ?
        WHERE id = ?
      `, [
        nome,
        email,
        telefone,
        rol,
        activo ? 1 : 0,
        id
      ])

    }

    if (result.affectedRows === 0) {

      return res.status(404).json({
        error: 'Usuário não encontrado'
      })

    }

    const [[usuario]] = await db.query(`
      SELECT
        id,
        nome,
        email,
        telefone,
        rol,
        activo,
        organizacao_id,
        created_at
      FROM usuarios
      WHERE id = ?
    `, [id])

    res.json({
      success: true,
      usuario
    })

  } catch (error) {

    console.error(
      'ERRO UPDATE USUARIO:',
      error
    )

    res.status(500).json({
      error: error.message
    })

  }

}


// =====================================================
// ALTERAR STATUS
// =====================================================

export const alterarStatus = async (req, res) => {

  try {

    const { id } = req.params
    const { activo } = req.body

    const organizacaoId =
      req.user?.organizacao_id

    if (activo === undefined) {

      return res.status(400).json({
        error: 'O campo activo é obrigatório'
      })

    }

    let result

    if (organizacaoId) {

      ;[result] = await db.query(`
        UPDATE usuarios
        SET activo = ?
        WHERE id = ?
        AND organizacao_id = ?
      `, [
        activo ? 1 : 0,
        id,
        organizacaoId
      ])

    } else {

      ;[result] = await db.query(`
        UPDATE usuarios
        SET activo = ?
        WHERE id = ?
      `, [
        activo ? 1 : 0,
        id
      ])

    }

    if (result.affectedRows === 0) {

      return res.status(404).json({
        error: 'Usuário não encontrado'
      })

    }

    res.json({
      success: true
    })

  } catch (error) {

    console.error(
      'ERRO ALTERAR STATUS:',
      error
    )

    res.status(500).json({
      error: error.message
    })

  }

}


// =====================================================
// ALTERAR SENHA
// =====================================================

export const alterarSenha = async (req, res) => {

  try {

    const { id } = req.params
    const { password } = req.body

    const organizacaoId =
      req.user?.organizacao_id

    if (!password) {

      return res.status(400).json({
        error: 'A nova senha é obrigatória'
      })

    }

    const hash = await bcrypt.hash(
      password,
      10
    )

    let result

    if (organizacaoId) {

      ;[result] = await db.query(`
        UPDATE usuarios
        SET password = ?
        WHERE id = ?
        AND organizacao_id = ?
      `, [
        hash,
        id,
        organizacaoId
      ])

    } else {

      ;[result] = await db.query(`
        UPDATE usuarios
        SET password = ?
        WHERE id = ?
      `, [
        hash,
        id
      ])

    }

    if (result.affectedRows === 0) {

      return res.status(404).json({
        error: 'Usuário não encontrado'
      })

    }

    res.json({
      success: true,
      message: 'Senha alterada com sucesso'
    })

  } catch (error) {

    console.error(
      'ERRO ALTERAR SENHA:',
      error
    )

    res.status(500).json({
      error: error.message
    })

  }

}


// =====================================================
// DELETE USUARIO
// =====================================================

export const deleteUsuario = async (req, res) => {

  try {

    const { id } = req.params

    const organizacaoId =
      req.user?.organizacao_id

    let result

    if (organizacaoId) {

      ;[result] = await db.query(`
        DELETE FROM usuarios
        WHERE id = ?
        AND organizacao_id = ?
      `, [
        id,
        organizacaoId
      ])

    } else {

      ;[result] = await db.query(`
        DELETE FROM usuarios
        WHERE id = ?
      `, [id])

    }

    if (result.affectedRows === 0) {

      return res.status(404).json({
        error: 'Usuário não encontrado'
      })

    }

    res.json({
      success: true,
      message: 'Usuário excluído com sucesso'
    })

  } catch (error) {

    console.error(
      'ERRO DELETE USUARIO:',
      error
    )

    res.status(500).json({
      error: error.message
    })

  }

}


// =====================================================
// GET USUARIO BY ID
// =====================================================

export const getUsuarioById = async (req, res) => {

  try {

    const { id } = req.params

    const organizacaoId =
      req.user?.organizacao_id

    let query = `
      SELECT
        id,
        nome,
        email,
        telefone,
        rol,
        activo,
        organizacao_id,
        created_at
      FROM usuarios
      WHERE id = ?
    `

    const params = [id]

    if (organizacaoId) {

      query += `
        AND organizacao_id = ?
      `

      params.push(organizacaoId)

    }

    const [[usuario]] = await db.query(
      query,
      params
    )

    if (!usuario) {

      return res.status(404).json({
        error: 'Usuário não encontrado'
      })

    }

    res.json(usuario)

  } catch (error) {

    console.error(
      'ERRO GET USUARIO:',
      error
    )

    res.status(500).json({
      error: error.message
    })

  }

}
