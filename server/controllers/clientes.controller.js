import db from '../config/db.js'

export const getClientes = async (req, res) => {
  console.log('getClientes')
  try {

    const [rows] = await db.query(`
      SELECT
        c.*,

        COUNT(DISTINCT a.id) AS total_alugueis,

        COUNT(DISTINCT ai.equipamento_id) AS total_equipamentos,

        (
          SELECT COUNT(*)
          FROM complementos cp
          WHERE cp.aluguel_id IN (
            SELECT id
            FROM alugueis
            WHERE cliente_id = c.id
          )
        ) AS total_complementos

      FROM clientes c

      LEFT JOIN alugueis a
        ON a.cliente_id = c.id

      LEFT JOIN aluguel_itens ai
        ON ai.aluguel_id = a.id

      GROUP BY c.id

      ORDER BY c.nome
    `)

    res.json(rows)

  } catch (error) {

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

  console.log('================ DELETE CLIENTE ================')
  console.log('req.params =', req.params)
  console.log('req.params.id =', req.params.id)
  console.log('typeof id =', typeof req.params.id)
  console.log('originalUrl =', req.originalUrl)
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
