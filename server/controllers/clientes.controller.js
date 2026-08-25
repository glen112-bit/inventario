import db from '../config/db.js'


/*
==========================================================
GET CLIENTES
==========================================================
*/

export const getClientes = async (req, res) => {

  try {
    console.log('========== GET CLIENTES ==========')
    console.log('REQ.USER:', req.user)
    console.log('ORGANIZACAO ID:', req.user?.organizacao_id)
    const organizacaoId = req.user?.organizacao_id

    if (!organizacaoId) {

      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })

    }


    const [rows] = await db.query(
      `
      SELECT

        c.*,

        COUNT(DISTINCT a.id) AS total_alugueis,

        COUNT(DISTINCT ai.equipamento_id)
          AS total_equipamentos,

        (
          SELECT COUNT(*)

          FROM complementos cp

          INNER JOIN alugueis ax
            ON ax.id = cp.aluguel_id

          WHERE ax.cliente_id = c.id

            AND ax.organizacao_id = ?

        ) AS total_complementos

      FROM clientes c

      LEFT JOIN alugueis a
        ON a.cliente_id = c.id
        AND a.organizacao_id = ?

      LEFT JOIN aluguel_itens ai
        ON ai.aluguel_id = a.id

      WHERE c.organizacao_id = ?

      GROUP BY c.id

      ORDER BY c.nome
      `,
      [
        organizacaoId,
        organizacaoId,
        organizacaoId
      ]
    )


    res.json(rows)

  } catch (error) {

    console.error(
      'GET CLIENTES:',
      error
    )

    res.status(500).json({
      error: error.message
    })

  }

}


/*
==========================================================
CREATE CLIENTE
==========================================================
*/

export const createCliente = async (req, res) => {

  try {

    const organizacaoId =
      req.user?.organizacao_id


    if (!organizacaoId) {

      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })

    }


    const {
      nome,
      documento,
      telefone,
      email,
      endereco
    } = req.body


    if (!nome) {

      return res.status(400).json({
        error: 'Nome do cliente é obrigatório.'
      })

    }


    /*
    usuario_id não vem mais obrigatoriamente
    do frontend.

    O usuário autenticado é o responsável.
    */

    const usuarioId =
      req.user.id


    const [result] = await db.query(
      `
      INSERT INTO clientes (

        nome,
        documento,
        telefone,
        email,
        endereco,
        usuario_id,
        organizacao_id

      )

      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        nome,
        documento || null,
        telefone || null,
        email || null,
        endereco || null,
        usuarioId,
        organizacaoId
      ]
    )


    res.status(201).json({

      success: true,

      id: result.insertId

    })

  } catch (error) {

    console.error(
      'CREATE CLIENTE:',
      error
    )

    res.status(500).json({
      error: error.message
    })

  }

}


/*
==========================================================
UPDATE CLIENTE
==========================================================
*/

export const updateCliente = async (req, res) => {

  try {

    const {
      id
    } = req.params


    const organizacaoId =
      req.user?.organizacao_id


    if (!organizacaoId) {

      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })

    }


    const {
      nome,
      documento,
      telefone,
      email,
      endereco
    } = req.body


    /*
    Primeiro verificamos se o cliente
    pertence à organização.
    */

    const [clientes] = await db.query(
      `
      SELECT id

      FROM clientes

      WHERE id = ?

        AND organizacao_id = ?

      LIMIT 1
      `,
      [
        id,
        organizacaoId
      ]
    )


    if (!clientes.length) {

      return res.status(404).json({
        error: 'Cliente não encontrado.'
      })

    }


    await db.query(
      `
      UPDATE clientes

      SET

        nome = ?,

        documento = ?,

        telefone = ?,

        email = ?,

        endereco = ?

      WHERE id = ?

        AND organizacao_id = ?
      `,
      [
        nome,
        documento || null,
        telefone || null,
        email || null,
        endereco || null,
        id,
        organizacaoId
      ]
    )


    res.json({
      success: true
    })

  } catch (error) {

    console.error(
      'UPDATE CLIENTE:',
      error
    )

    res.status(500).json({
      error: error.message
    })

  }

}


/*
==========================================================
DELETE CLIENTE
==========================================================
*/

export const deleteCliente = async (req, res) => {

  try {

    const {
      id
    } = req.params


    const organizacaoId =
      req.user?.organizacao_id


    if (!organizacaoId) {

      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })

    }


    /*
    Nunca fazemos:

    DELETE FROM clientes
    WHERE id = ?

    porque isso permitiria apagar
    um cliente de outra organização.
    */

    const [result] = await db.query(
      `
      DELETE FROM clientes

      WHERE id = ?

        AND organizacao_id = ?
      `,
      [
        id,
        organizacaoId
      ]
    )


    if (result.affectedRows === 0) {

      return res.status(404).json({
        error: 'Cliente não encontrado.'
      })

    }


    res.json({
      success: true
    })

  } catch (error) {

    console.error(
      'DELETE CLIENTE:',
      error
    )

    res.status(500).json({
      error: error.message
    })

  }

}
