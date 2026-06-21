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
