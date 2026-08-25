import db from '../config/db.js'

export const getSetupStatus = async (req, res) => {

  try {
    const [[result]] = await db.query(`
            SELECT COUNT(*) AS total
            FROM usuarios
        `)

    const total = Number(result.total)

    res.json({
      setupRequired: total === 0,
      totalUsuarios: total
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: error.message
    })
  }
}


import bcrypt from 'bcryptjs'

export const createFirstAdmin = async (req, res) => {

    const connection = await db.getConnection()

    try {

        const {
            nome,
            email,
            telefone,
            password
        } = req.body

        if (
            !nome ||
            !email ||
            !password
        ) {

            return res.status(400).json({
                error: 'Nome, email e senha são obrigatórios.'
            })

        }

        const [[existing]] = await connection.query(`
            SELECT COUNT(*) AS total
            FROM usuarios
        `)

        if (Number(existing.total) > 0) {

            return res.status(403).json({
                error: 'O administrador inicial já foi criado.'
            })

        }

        const senhaHash = await bcrypt.hash(
            password,
            10
        )

        const [result] = await connection.query(`
            INSERT INTO usuarios
            (
                nome,
                email,
                telefone,
                password,
                rol
            )
            VALUES (?, ?, ?, ?, 'admin')
        `, [
            nome,
            email,
            telefone || null,
            senhaHash
        ])

        res.status(201).json({

            success: true,

            message: 'Administrador criado com sucesso.',

            usuario_id: result.insertId

        })

    } catch (error) {

        console.error(error)

        res.status(500).json({
            error: error.message
        })

    } finally {

        connection.release()

    }

}
