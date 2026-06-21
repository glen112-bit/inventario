
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
