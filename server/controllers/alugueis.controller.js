import db from '../config/db.js'

import {
  registrarHistoricoEquipamento
} from './equipos.controller.js'


/*
===========================================================
HELPERS
===========================================================
*/

const getOrganizacaoId = (req) => {

  const organizacaoId = req.user?.organizacao_id

  if (!organizacaoId) {
    const error = new Error(
      'Usuário não está associado a uma organização.'
    )

    error.status = 403

    throw error
  }

  return organizacaoId

}


/*
===========================================================
GET ALUGUEIS
===========================================================
*/

export const getAlugueis = async (req, res) => {

  try {

    const organizacaoId = getOrganizacaoId(req)

    /*
    -------------------------------------------------------
    CLIENTE
    -------------------------------------------------------
    */

    if (req.user.rol === 'cliente') {

      const clienteId = req.user.cliente_id

      const [rows] = await db.query(
        `
        SELECT

          a.id,
          a.cliente_id,
          c.nome AS cliente,

          a.fecha_salida,
          a.fecha_retorno,
          a.estado,
          a.observacoes,
          a.usuario_id,
          a.created_at,

          COUNT(
            DISTINCT ai.equipamento_id
          ) AS total_equipamentos

        FROM alugueis a

        LEFT JOIN clientes c
          ON c.id = a.cliente_id

        LEFT JOIN aluguel_itens ai
          ON ai.aluguel_id = a.id

        WHERE
          a.organizacao_id = ?
          AND a.cliente_id = ?

        GROUP BY

          a.id,
          a.cliente_id,
          c.nome,
          a.fecha_salida,
          a.fecha_retorno,
          a.estado,
          a.observacoes,
          a.usuario_id,
          a.created_at

        ORDER BY a.id DESC
        `,
        [
          organizacaoId,
          clienteId
        ]
      )

      return res.json(rows)

    }


    /*
    -------------------------------------------------------
    ADMIN / OPERADOR / TECNICO
    -------------------------------------------------------
    */

    const [rows] = await db.query(
      `
      SELECT

        a.id,
        a.cliente_id,
        c.nome AS cliente,

        a.fecha_salida,
        a.fecha_retorno,
        a.estado,
        a.observacoes,
        a.usuario_id,
        a.created_at,

        COUNT(
          DISTINCT ai.equipamento_id
        ) AS total_equipamentos,

        (
          SELECT COUNT(*)
          FROM complementos cp
          WHERE cp.aluguel_id = a.id
        ) AS total_complementos

      FROM alugueis a

      LEFT JOIN clientes c
        ON c.id = a.cliente_id

      LEFT JOIN aluguel_itens ai
        ON ai.aluguel_id = a.id

      WHERE
        a.organizacao_id = ?

      GROUP BY

        a.id,
        a.cliente_id,
        c.nome,
        a.fecha_salida,
        a.fecha_retorno,
        a.estado,
        a.observacoes,
        a.usuario_id,
        a.created_at

      ORDER BY a.id DESC
      `,
      [organizacaoId]
    )

    res.json(rows)

  } catch (error) {

    console.error('GET ALUGUEIS:', error)

    res.status(
      error.status || 500
    ).json({
      error: error.message
    })

  }

}


/*
===========================================================
CREATE ALUGUEL
===========================================================
*/

export const createAluguel = async (req, res) => {

  const connection = await db.getConnection()

  try {

    const organizacaoId = getOrganizacaoId(req)

    const {

      cliente_id,
      fecha_salida,
      fecha_retorno,
      observacoes,
      equipamentos

    } = req.body


    /*
    -------------------------------------------------------
    VALIDACIONES
    -------------------------------------------------------
    */

    if (!cliente_id) {

      return res.status(400).json({
        error: 'Cliente é obrigatório.'
      })

    }

    if (
      !Array.isArray(equipamentos) ||
      equipamentos.length === 0
    ) {

      return res.status(400).json({
        error: 'É necessário adicionar pelo menos um equipamento.'
      })

    }


    /*
    -------------------------------------------------------
    USUARIO AUTENTICADO
    -------------------------------------------------------
    */

    const usuarioId = req.user.id


    /*
    -------------------------------------------------------
    VERIFICAR CLIENTE
    -------------------------------------------------------
    */

    const [[cliente]] = await connection.query(
      `
      SELECT id

      FROM clientes

      WHERE
        id = ?
        AND organizacao_id = ?

      LIMIT 1
      `,
      [
        cliente_id,
        organizacaoId
      ]
    )

    if (!cliente) {

      return res.status(404).json({
        error: 'Cliente não encontrado na organização.'
      })

    }


    /*
    -------------------------------------------------------
    VERIFICAR EQUIPAMENTOS
    -------------------------------------------------------
    */

    const ids = [
      ...new Set(
        equipamentos.map(
          id => Number(id)
        )
      )
    ]

    const placeholders =
      ids.map(() => '?').join(',')


    const [equipamentosDB] =
      await connection.query(
        `
        SELECT

          equipamento_id,
          codigo_interno,
          estado_actual

        FROM equipos

        WHERE
          organizacao_id = ?
          AND equipamento_id IN (${placeholders})

        FOR UPDATE
        `,
        [
          organizacaoId,
          ...ids
        ]
      )


    if (
      equipamentosDB.length !== ids.length
    ) {

      return res.status(400).json({
        error:
          'Um ou mais equipamentos não pertencem à organização.'
      })

    }


    /*
    -------------------------------------------------------
    VERIFICAR DISPONIBILIDADE
    -------------------------------------------------------
    */

    const indisponiveis =
      equipamentosDB.filter(
        eq =>
          eq.estado_actual !== 'disponivel'
      )


    if (indisponiveis.length > 0) {

      return res.status(409).json({

        error:
          'Existem equipamentos que não estão disponíveis.',

        equipamentos:
          indisponiveis.map(eq => ({
            equipamento_id:
              eq.equipamento_id,

            codigo_interno:
              eq.codigo_interno,

            estado:
              eq.estado_actual
          }))

      })

    }


    /*
    -------------------------------------------------------
    TRANSACTION
    -------------------------------------------------------
    */

    await connection.beginTransaction()


    /*
    -------------------------------------------------------
    CRIAR ALUGUEL
    -------------------------------------------------------
    */

    const [result] =
      await connection.query(
        `
        INSERT INTO alugueis (

          cliente_id,
          fecha_salida,
          fecha_retorno,
          estado,
          observacoes,
          usuario_id,
          organizacao_id

        )

        VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [

          cliente_id,
          fecha_salida,
          fecha_retorno,

          'ativo',

          observacoes || null,

          usuarioId,

          organizacaoId

        ]
      )


    const aluguelId =
      result.insertId


    /*
    -------------------------------------------------------
    EQUIPAMENTOS
    -------------------------------------------------------
    */

    for (const equipamentoId of ids) {

      await connection.query(
        `
        INSERT INTO aluguel_itens (

          aluguel_id,
          equipamento_id

        )

        VALUES (?, ?)
        `,
        [
          aluguelId,
          equipamentoId
        ]
      )


      await connection.query(
        `
        UPDATE equipos

        SET estado_actual = 'alugado'

        WHERE
          equipamento_id = ?
          AND organizacao_id = ?
        `,
        [
          equipamentoId,
          organizacaoId
        ]
      )


      /*
      Histórico.

      Mantemos sua função existente.
      */

      await registrarHistoricoEquipamento(

        equipamentoId,

        'disponivel',

        'alugado',

        `Saída para aluguel #${aluguelId}`,

        usuarioId

      )

    }


    await connection.commit()


    res.status(201).json({

      success: true,

      aluguelId,

      organizacao_id:
        organizacaoId

    })


  } catch (error) {

    await connection.rollback()

    console.error(
      'CREATE ALUGUEL:',
      error
    )

    res.status(
      error.status || 500
    ).json({
      error: error.message
    })

  } finally {

    connection.release()

  }

}


/*
===========================================================
GET ALUGUEL BY ID
===========================================================
*/

export const getAluguelById = async (
  req,
  res
) => {

  try {

    const organizacaoId =
      getOrganizacaoId(req)

    const { id } = req.params


    /*
    -------------------------------------------------------
    ALUGUEL
    -------------------------------------------------------
    */

    const [[aluguel]] =
      await db.query(
        `
        SELECT

          a.*,

          c.nome AS cliente,
          c.telefone,
          c.email

        FROM alugueis a

        LEFT JOIN clientes c
          ON c.id = a.cliente_id

        WHERE

          a.id = ?
          AND a.organizacao_id = ?

        LIMIT 1
        `,
        [
          id,
          organizacaoId
        ]
      )


    if (!aluguel) {

      return res.status(404).json({
        error: 'Aluguel não encontrado.'
      })

    }


    /*
    -------------------------------------------------------
    EQUIPAMENTOS
    -------------------------------------------------------
    */

    const [equipamentos] =
      await db.query(
        `
        SELECT

          e.equipamento_id,
          e.codigo_interno,
          e.marca,
          e.modelo,
          e.estado_actual,
          e.numero_serie,
          e.qr_code

        FROM aluguel_itens ai

        INNER JOIN equipos e
          ON e.equipamento_id =
             ai.equipamento_id

        WHERE

          ai.aluguel_id = ?
          AND e.organizacao_id = ?

        ORDER BY e.codigo_interno
        `,
        [
          id,
          organizacaoId
        ]
      )


    /*
    -------------------------------------------------------
    COMPLEMENTOS
    -------------------------------------------------------
    */

    let complementos = []

    try {

      const [rows] =
        await db.query(
          `
          SELECT *

          FROM complementos

          WHERE aluguel_id = ?

          ORDER BY id DESC
          `,
          [id]
        )

      complementos = rows

    } catch (error) {

      /*
      Se a tabela ainda não existir,
      não derrubamos o perfil do aluguel.
      */

      if (error.code !== 'ER_NO_SUCH_TABLE') {
        throw error
      }

    }


    res.json({

      ...aluguel,

      equipamentos,

      complementos

    })


  } catch (error) {

    console.error(
      'GET ALUGUEL:',
      error
    )

    res.status(
      error.status || 500
    ).json({
      error: error.message
    })

  }

}


/*
===========================================================
GET ALUGUEL DETALHES
===========================================================
*/

export const getAluguelDetalhes = async (
  req,
  res
) => {

  try {

    const organizacaoId =
      getOrganizacaoId(req)

    const { id } = req.params


    const [[aluguel]] =
      await db.query(
        `
        SELECT

          a.*,

          c.nome AS cliente

        FROM alugueis a

        LEFT JOIN clientes c
          ON c.id = a.cliente_id

        WHERE

          a.id = ?
          AND a.organizacao_id = ?

        LIMIT 1
        `,
        [
          id,
          organizacaoId
        ]
      )


    if (!aluguel) {

      return res.status(404).json({
        error: 'Aluguel não encontrado.'
      })

    }


    const [equipamentos] =
      await db.query(
        `
        SELECT

          e.equipamento_id,
          e.codigo_interno,
          e.marca,
          e.modelo,
          e.estado_actual

        FROM aluguel_itens ai

        INNER JOIN equipos e
          ON e.equipamento_id =
             ai.equipamento_id

        WHERE

          ai.aluguel_id = ?
          AND e.organizacao_id = ?

        ORDER BY e.codigo_interno
        `,
        [
          id,
          organizacaoId
        ]
      )


    res.json({

      ...aluguel,

      equipamentos

    })


  } catch (error) {

    console.error(
      'GET ALUGUEL DETALHES:',
      error
    )

    res.status(
      error.status || 500
    ).json({
      error: error.message
    })

  }

}


/*
===========================================================
DELETE ALUGUEL
===========================================================
*/

export const deleteAluguel = async (
  req,
  res
) => {

  const connection =
    await db.getConnection()

  try {

    const organizacaoId =
      getOrganizacaoId(req)

    const { id } =
      req.params

    const usuarioId =
      req.user.id


    /*
    -------------------------------------------------------
    VERIFICAR ALUGUEL
    -------------------------------------------------------
    */

    const [[aluguel]] =
      await connection.query(
        `
        SELECT id

        FROM alugueis

        WHERE

          id = ?
          AND organizacao_id = ?

        LIMIT 1
        `,
        [
          id,
          organizacaoId
        ]
      )


    if (!aluguel) {

      return res.status(404).json({
        error: 'Aluguel não encontrado.'
      })

    }


    /*
    -------------------------------------------------------
    EQUIPAMENTOS
    -------------------------------------------------------
    */

    const [equipamentos] =
      await connection.query(
        `
        SELECT

          ai.equipamento_id,
          e.estado_actual

        FROM aluguel_itens ai

        INNER JOIN equipos e
          ON e.equipamento_id =
             ai.equipamento_id

        WHERE

          ai.aluguel_id = ?
          AND e.organizacao_id = ?

        FOR UPDATE
        `,
        [
          id,
          organizacaoId
        ]
      )


    await connection.beginTransaction()


    /*
    -------------------------------------------------------
    LIBERAR EQUIPAMENTOS
    -------------------------------------------------------
    */

    for (
      const item of equipamentos
    ) {

      await connection.query(
        `
        UPDATE equipos

        SET estado_actual =
          'disponivel'

        WHERE

          equipamento_id = ?
          AND organizacao_id = ?
        `,
        [
          item.equipamento_id,
          organizacaoId
        ]
      )


      await registrarHistoricoEquipamento(

        item.equipamento_id,

        item.estado_actual ||
          'alugado',

        'disponivel',

        `Aluguel #${id} excluído`,

        usuarioId

      )

    }


    /*
    -------------------------------------------------------
    DELETE ITEMS
    -------------------------------------------------------
    */

    await connection.query(
      `
      DELETE FROM aluguel_itens

      WHERE aluguel_id = ?
      `,
      [id]
    )


    /*
    -------------------------------------------------------
    DELETE ALUGUEL
    -------------------------------------------------------
    */

    await connection.query(
      `
      DELETE FROM alugueis

      WHERE

        id = ?
        AND organizacao_id = ?
      `,
      [
        id,
        organizacaoId
      ]
    )


    await connection.commit()


    res.json({
      success: true
    })


  } catch (error) {

    await connection.rollback()

    console.error(
      'DELETE ALUGUEL:',
      error
    )

    res.status(
      error.status || 500
    ).json({
      error: error.message
    })

  } finally {

    connection.release()

  }

}


/*
===========================================================
ATUALIZAR ALUGUEL
===========================================================
*/

export const atualizarAluguel = async (
  req,
  res
) => {

  const connection =
    await db.getConnection()

  try {

    const organizacaoId =
      getOrganizacaoId(req)

    const { id } =
      req.params

    const {

      cliente_id,
      fecha_salida,
      fecha_retorno,
      observacoes,
      equipamentos

    } = req.body


    const usuarioId =
      req.user.id


    /*
    -------------------------------------------------------
    VERIFICAR ALUGUEL
    -------------------------------------------------------
    */

    const [[aluguel]] =
      await connection.query(
        `
        SELECT id

        FROM alugueis

        WHERE

          id = ?
          AND organizacao_id = ?

        LIMIT 1
        `,
        [
          id,
          organizacaoId
        ]
      )


    if (!aluguel) {

      return res.status(404).json({
        error: 'Aluguel não encontrado.'
      })

    }


    /*
    -------------------------------------------------------
    VERIFICAR CLIENTE
    -------------------------------------------------------
    */

    const [[cliente]] =
      await connection.query(
        `
        SELECT id

        FROM clientes

        WHERE

          id = ?
          AND organizacao_id = ?

        LIMIT 1
        `,
        [
          cliente_id,
          organizacaoId
        ]
      )


    if (!cliente) {

      return res.status(404).json({
        error: 'Cliente não pertence à organização.'
      })

    }


    const idsNuevos = [
      ...new Set(
        (equipamentos || []).map(
          id => Number(id)
        )
      )
    ]


    if (idsNuevos.length === 0) {

      return res.status(400).json({
        error:
          'O aluguel precisa ter pelo menos um equipamento.'
      })

    }


    /*
    -------------------------------------------------------
    EQUIPAMENTOS ATUAIS
    -------------------------------------------------------
    */

    const [equiposAnteriores] =
      await connection.query(
        `
        SELECT equipamento_id

        FROM aluguel_itens

        WHERE aluguel_id = ?
        `,
        [id]
      )


    const idsAnteriores =
      equiposAnteriores.map(
        item =>
          Number(
            item.equipamento_id
          )
      )


    const removidos =
      idsAnteriores.filter(
        item =>
          !idsNuevos.includes(item)
      )


    const adicionados =
      idsNuevos.filter(
        item =>
          !idsAnteriores.includes(item)
      )


    /*
    -------------------------------------------------------
    VERIFICAR NOVOS EQUIPAMENTOS
    -------------------------------------------------------
    */

    const placeholders =
      idsNuevos
        .map(() => '?')
        .join(',')


    const [equipamentosDB] =
      await connection.query(
        `
        SELECT

          equipamento_id,
          estado_actual,
          codigo_interno

        FROM equipos

        WHERE

          organizacao_id = ?

          AND equipamento_id IN (
            ${placeholders}
          )

        FOR UPDATE
        `,
        [
          organizacaoId,
          ...idsNuevos
        ]
      )


    if (
      equipamentosDB.length !==
      idsNuevos.length
    ) {

      return res.status(400).json({
        error:
          'Um ou mais equipamentos não pertencem à organização.'
      })

    }


    /*
    -------------------------------------------------------
    TRANSACTION
    -------------------------------------------------------
    */

    await connection.beginTransaction()


    /*
    -------------------------------------------------------
    ATUALIZAR ALUGUEL
    -------------------------------------------------------
    */

    await connection.query(
      `
      UPDATE alugueis

      SET

        cliente_id = ?,
        fecha_salida = ?,
        fecha_retorno = ?,
        observacoes = ?

      WHERE

        id = ?
        AND organizacao_id = ?
      `,
      [
        cliente_id,
        fecha_salida,
        fecha_retorno,
        observacoes || null,
        id,
        organizacaoId
      ]
    )


    /*
    -------------------------------------------------------
    EQUIPAMENTOS REMOVIDOS
    -------------------------------------------------------
    */

    for (
      const equipamentoId of removidos
    ) {

      await connection.query(
        `
        UPDATE equipos

        SET estado_actual =
          'disponivel'

        WHERE

          equipamento_id = ?
          AND organizacao_id = ?
        `,
        [
          equipamentoId,
          organizacaoId
        ]
      )


      await registrarHistoricoEquipamento(

        equipamentoId,

        'alugado',

        'disponivel',

        `Removido do aluguel #${id}`,

        usuarioId

      )

    }


    /*
    -------------------------------------------------------
    EQUIPAMENTOS ADICIONADOS
    -------------------------------------------------------
    */

    for (
      const equipamentoId of adicionados
    ) {

      const equipamento =
        equipamentosDB.find(
          item =>
            Number(
              item.equipamento_id
            ) === equipamentoId
        )


      if (
        equipamento &&
        equipamento.estado_actual !==
          'disponivel'
      ) {

        return res.status(409).json({

          error:
            `O equipamento ${equipamento.codigo_interno} não está disponível.`

        })

      }


      await connection.query(
        `
        UPDATE equipos

        SET estado_actual =
          'alugado'

        WHERE

          equipamento_id = ?
          AND organizacao_id = ?
        `,
        [
          equipamentoId,
          organizacaoId
        ]
      )


      await registrarHistoricoEquipamento(

        equipamentoId,

        'disponivel',

        'alugado',

        `Adicionado ao aluguel #${id}`,

        usuarioId

      )

    }


    /*
    -------------------------------------------------------
    RECRIAR ITENS
    -------------------------------------------------------
    */

    await connection.query(
      `
      DELETE FROM aluguel_itens

      WHERE aluguel_id = ?
      `,
      [id]
    )


    for (
      const equipamentoId of idsNuevos
    ) {

      await connection.query(
        `
        INSERT INTO aluguel_itens (

          aluguel_id,
          equipamento_id

        )

        VALUES (?, ?)
        `,
        [
          id,
          equipamentoId
        ]
      )

    }


    await connection.commit()


    res.json({
      success: true
    })


  } catch (error) {

    await connection.rollback()

    console.error(
      'ATUALIZAR ALUGUEL:',
      error
    )

    res.status(
      error.status || 500
    ).json({
      error: error.message
    })

  } finally {

    connection.release()

  }

}
