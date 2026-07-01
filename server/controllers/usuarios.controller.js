
import bcrypt from 'bcryptjs'
import db from '../config/db.js'

export const getUsuarios = async ( req, res ) => {
  try {
    const [ rows ] = await db.query(
      'SELECT * FROM usuarios'
    )
    res.json(rows)
  } catch(error) {

    console.error(error)
    res.status(500).json({
      error: error.message 
    })
  }
}

export const createUsuario = async (req, res) => {
  try{
    const {
      nome,
      email,
      telefone,
      password, 
      rol,
      activo = true
    } = req.body
    const [existe] = await db.query(`
      SELECT id
      FROM usuarios
      WHERE email = ?
    `, [email])

    if(existe.length > 0 ) {
      return res.status(400).json({
        error: 'Ja existe Usuario com esse e-mail'
      })
    }

    const senhaHash = await bcrypt.hash(password, 10)

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
      telefone,
      senhaHash,
      rol,
      true 
    ])

    const [[usuario]] = await db.query(`
      SELECT
        id,
        nome,
        email,
        telefone,
        rol,
        activo
      FROM usuarios
      WHERE id = ?
    `, [result.insertId])
    res.status(201).json({
      succes: true,
      usuario
    })
  }catch (error) {
    console.error(error)
    res.status(500).json({
      error: error.message
    })
  }
}
