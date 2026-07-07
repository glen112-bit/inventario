import db from '../config/db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const login = async (req, res) => {
  try {

    const {
      telefone,
      password
    } = req.body

    const [usuarios] = await db.query(`
      SELECT *
      FROM usuarios
      WHERE telefone = ?
    `, [telefone])

    if (!usuarios.length) {
      return res.status(401).json({
        error: 'Usuário não encontrado'
      })
    }

    const usuario = usuarios[0]
    const senhaValida = await bcrypt.compare(
      password,
      usuario.password
    )

    if (!senhaValida) {
      return res.status(401).json({
        error: 'Senha inválida'
      })
    }

    let cliente_id = null

    if (usuario.rol === 'cliente') {

      const [clientes] = await db.query(`
        SELECT id
        FROM clientes
        WHERE telefone = ?
      `, [usuario.telefone])

      cliente_id = clientes[0]?.id || null

    }

    const token = jwt.sign(
      {
        id: usuario.id,
        nome: usuario.nome,
        telefone: usuario.telefone,
        rol: usuario.rol,
        cliente_id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d'
      }
    )

    res.json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        rol: usuario.rol,
        cliente_id
      }
    })

  } catch(error) {

    console.error(error)

    res.status(500).json({
      error: error.message
    })

  }

}
