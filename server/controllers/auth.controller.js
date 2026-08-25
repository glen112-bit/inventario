import db from '../config/db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


export const login = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body


    // =====================================================
    // BUSCAR USUARIO
    // =====================================================

    const [usuarios] = await db.query(`
      SELECT
        id,
        nome,
        email,
        telefone,
        password,
        rol,
        activo,
        organizacao_id
      FROM usuarios
      WHERE email = ?
      LIMIT 1
    `, [
      email
    ])


    if (!usuarios.length) {

      return res.status(401).json({
        error: 'Usuário não encontrado'
      })

    }


    const usuario = usuarios[0]


    // =====================================================
    // VERIFICAR USUÁRIO ATIVO
    // =====================================================

    if (!usuario.activo) {

      return res.status(403).json({
        error: 'Usuário desativado'
      })

    }


    // =====================================================
    // VERIFICAR SENHA
    // =====================================================

    const senhaValida =
      await bcrypt.compare(
        password,
        usuario.password
      )


    if (!senhaValida) {

      return res.status(401).json({
        error: 'Senha inválida'
      })

    }


    // =====================================================
    // CLIENTE
    // =====================================================

    let cliente_id = null


    if (usuario.rol === 'cliente') {

      const [clientes] =
        await db.query(`
          SELECT id
          FROM clientes
          WHERE telefone = ?
          LIMIT 1
        `, [
          usuario.telefone
        ])

      cliente_id =
        clientes[0]?.id || null

    }


    // =====================================================
    // VERIFICAR ORGANIZAÇÃO
    // =====================================================

    if (!usuario.organizacao_id) {

      console.warn(
        'USUÁRIO SEM ORGANIZAÇÃO:',
        usuario.id,
        usuario.email
      )

    }


    // =====================================================
    // JWT
    // =====================================================

    const token = jwt.sign(

      {
        id: usuario.id,

        nome: usuario.nome,

        email: usuario.email,

        telefone: usuario.telefone,

        rol: usuario.rol,

        cliente_id,

        organizacao_id:
          usuario.organizacao_id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: '7d'
      }

    )


    // =====================================================
    // RESPONSE
    // =====================================================

    res.json({

      token,

      usuario: {

        id: usuario.id,

        nome: usuario.nome,

        email: usuario.email,

        telefone: usuario.telefone,

        rol: usuario.rol,

        cliente_id,

        organizacao_id:
          usuario.organizacao_id

      }

    })


  } catch (error) {

    console.error(
      'LOGIN ERROR:',
      error
    )

    res.status(500).json({
      error: error.message
    })

  }

}
