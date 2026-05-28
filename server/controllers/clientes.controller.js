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
