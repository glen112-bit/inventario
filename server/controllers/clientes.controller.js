import db from '../config/db.js'

export const getClientes = async ( req, res ) => {
  try {
    const [ rows ] = await db.query(
      'SELECT * FROM clientes'
    )
    res.json(rows)
  } catch(error) {

    console.error(error)
    res.status(500).json({
      error: error.message 
    })
  }
}
export const createCliente = async (
  req,
  res
) => {

  try {

    const {
      nome,
      documento,
      telefone,
      email,
      endereco,
      usuario_id 
    } = req.body

    const [result] = await db.query(`
      INSERT INTO clientes (
        nome,
        documento,
        telefone,
        email,
        endereco,
        usuario_id
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      nome,
      documento,
      telefone,
      email,
      endereco,
      usuario_id || null
    ])

    res.status(201).json({
      success: true,
      id: result.insertId
    })

  } catch(error) {

    console.error(error)

    res.status(500).json({
      error: error.message
    })

  }

}
export const updateCliente = async (req, res) => {

  try {

    const { id } = req.params

    const {
      nome,
      documento,
      telefone,
      email,
      endereco,
      usuario_id
    } = req.body

    await db.query(
      `
      UPDATE clientes
      SET
        nome=?,
        documento=?,
        telefone=?,
        email=?,
        endereco=?,
        usuario_id=?
      WHERE id=?
      `,
      [
        nome,
        documento,
        telefone,
        email,
        endereco,
        usuario_id || null,
        id
      ]
    )

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

export const deleteCliente = async (req, res) => {

  try {

    const { id } = req.params

    await db.query(
      'DELETE FROM clientes WHERE id=?',
      [id]
    )

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
