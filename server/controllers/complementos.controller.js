import db from '../config/db.js'

import {
  registrarHistoricoEquipamento
} from './equipos.controller.js'


/*
==========================================================
VALIDAR ORGANIZAÇÃO
==========================================================
*/

const getOrganizacaoId = (req) => {

  return req.user?.organizacao_id || null

}


/*
==========================================================
GET COMPLEMENTOS POR ALUGUEL
==========================================================
*/

export const getComplementosByAluguel = async (req, res) => {

  try {

    const { id } = req.params

    const organizacaoId =
      getOrganizacaoId(req)


    if (!organizacaoId) {

      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })

    }


    /*
    Verificar se o aluguel pertence
    à organização do usuário.
    */

    const [[aluguel]] = await db.query(
      `
      SELECT id

      FROM alugueis

      WHERE id = ?

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


    const [complementos] = await db.query(
      `
      SELECT *

      FROM complementos

      WHERE aluguel_id = ?

      ORDER BY created_at DESC
      `,
      [id]
    )


    for (const complemento of complementos) {

      const [equipamentos] = await db.query(
        `
        SELECT

          e.equipamento_id,

          e.codigo_interno,

          e.marca,

          e.modelo,

          e.estado_actual

        FROM complemento_itens ci

        INNER JOIN equipos e
          ON e.equipamento_id = ci.equipamento_id

        WHERE ci.complemento_id = ?

          AND e.organizacao_id = ?

        `,
        [
          complemento.id,
          organizacaoId
        ]
      )


      complemento.equipamentos =
        equipamentos

    }


    res.json(complementos)

  } catch (error) {

    console.error(
      'GET COMPLEMENTOS:',
      error
    )

    res.status(500).json({
      error: error.message
    })

  }

}


/*
==========================================================
GET COMPLEMENTO POR ID
==========================================================
*/

export const getComplementoById = async (req, res) => {

  try {

    const { id } = req.params

    const organizacaoId =
      getOrganizacaoId(req)


    if (!organizacaoId) {

      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })

    }


    const [[complemento]] = await db.query(
      `
      SELECT

        cp.*,

        a.cliente_id,

        a.estado AS aluguel_estado

      FROM complementos cp

      INNER JOIN alugueis a
        ON a.id = cp.aluguel_id

      WHERE cp.id = ?

        AND a.organizacao_id = ?

      LIMIT 1
      `,
      [
        id,
        organizacaoId
      ]
    )


    if (!complemento) {

      return res.status(404).json({
        error: 'Complemento não encontrado.'
      })

    }


    const [equipamentos] = await db.query(
      `
      SELECT

        e.*

      FROM complemento_itens ci

      INNER JOIN equipos e
        ON e.equipamento_id =
           ci.equipamento_id

      WHERE ci.complemento_id = ?

        AND e.organizacao_id = ?

      `,
      [
        id,
        organizacaoId
      ]
    )


    res.json({

      ...complemento,

      equipamentos

    })

  } catch (error) {

    console.error(
      'GET COMPLEMENTO:',
      error
    )

    res.status(500).json({
      error: error.message
    })

  }

}


/*
==========================================================
CREATE COMPLEMENTO
==========================================================
*/

export const createComplemento = async (req, res) => {

  const connection =
    await db.getConnection()

  try {

    const organizacaoId =
      getOrganizacaoId(req)

    if (!organizacaoId) {

      connection.release()

      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })

    }


    const {

      aluguel_id,

      fecha_salida,

      fecha_retorno,

      observacoes,

      equipamentos = []

    } = req.body


    const usuarioId =
      req.user.id


    /*
    ======================================================
    VALIDAR ALUGUEL
    ======================================================
    */

    const [[aluguel]] =
      await connection.query(
        `
        SELECT

          id,

          cliente_id,

          estado

        FROM alugueis

        WHERE id = ?

          AND organizacao_id = ?

        LIMIT 1
        `,
        [
          aluguel_id,
          organizacaoId
        ]
      )


    if (!aluguel) {

      connection.release()

      return res.status(404).json({
        error: 'Aluguel não encontrado.'
      })

    }


    /*
    ======================================================
    VALIDAR EQUIPAMENTOS
    ======================================================
    */

    if (!Array.isArray(equipamentos)) {

      connection.release()

      return res.status(400).json({
        error: 'Equipamentos inválidos.'
      })

    }


    /*
    Não permitir equipamento duplicado.
    */

    const equipamentosUnicos =
      [...new Set(
        equipamentos.map(
          Number
        )
      )]


    if (equipamentosUnicos.length !== equipamentos.length) {

      connection.release()

      return res.status(400).json({
        error: 'Existem equipamentos duplicados.'
      })

    }


    for (
      const equipamentoId
      of equipamentosUnicos
    ) {

      const [[equipamento]] =
        await connection.query(
          `
          SELECT

            equipamento_id,

            estado_actual

          FROM equipos

          WHERE equipamento_id = ?

            AND organizacao_id = ?

          LIMIT 1
          `,
          [
            equipamentoId,
            organizacaoId
          ]
        )


      if (!equipamento) {

        connection.release()

        return res.status(404).json({
          error:
            `Equipamento ${equipamentoId} não encontrado.`
        })

      }


      if (
        equipamento.estado_actual !==
        'disponivel'
      ) {

        connection.release()

        return res.status(409).json({
          error:
            `Equipamento ${equipamentoId} não está disponível.`
        })

      }

    }


    await connection.beginTransaction()


    /*
    ======================================================
    CRIAR COMPLEMENTO
    ======================================================
    */

    const [result] =
      await connection.query(
        `
        INSERT INTO complementos (

          aluguel_id,

          fecha_salida,

          fecha_retorno,

          observacoes,

          usuario_id

        )

        VALUES (?, ?, ?, ?, ?)
        `,
        [
          aluguel_id,

          fecha_salida || null,

          fecha_retorno || null,

          observacoes || null,

          usuarioId
        ]
      )


    const complementoId =
      result.insertId


    /*
    ======================================================
    INSERIR EQUIPAMENTOS
    ======================================================
    */

    for (
      const equipamentoId
      of equipamentosUnicos
    ) {

      await connection.query(
        `
        INSERT INTO complemento_itens (

          complemento_id,

          equipamento_id

        )

        VALUES (?, ?)
        `,
        [
          complementoId,

          equipamentoId
        ]
      )


      await connection.query(
        `
        UPDATE equipos

        SET estado_actual = 'alugado'

        WHERE equipamento_id = ?

          AND organizacao_id = ?
        `,
        [
          equipamentoId,

          organizacaoId
        ]
      )


      /*
      O histórico usa o usuário
      autenticado.
      */

      await registrarHistoricoEquipamento(

        equipamentoId,

        'disponivel',

        'alugado',

        `Complemento #${complementoId}`,

        usuarioId

      )

    }


    await connection.commit()

    connection.release()


    res.status(201).json({

      success: true,

      complementoId

    })

  } catch (error) {

    try {
      await connection.rollback()
    } catch {}

    connection.release()

    console.error(
      'CREATE COMPLEMENTO:',
      error
    )

    res.status(500).json({
      error: error.message
    })

  }

}


/*
==========================================================
UPDATE COMPLEMENTO
==========================================================
*/

export const updateComplemento = async (req, res) => {

  try {

    const { id } = req.params

    const organizacaoId =
      getOrganizacaoId(req)


    if (!organizacaoId) {

      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })

    }


    const {

      fecha_salida,

      fecha_retorno,

      observacoes,

      equipamentos = []

    } = req.body


    const usuarioId =
      req.user.id


    /*
    ======================================================
    VALIDAR COMPLEMENTO
    ======================================================
    */

    const [[complemento]] =
      await db.query(
        `
        SELECT

          cp.id,

          cp.aluguel_id

        FROM complementos cp

        INNER JOIN alugueis a
          ON a.id = cp.aluguel_id

        WHERE cp.id = ?

          AND a.organizacao_id = ?

        LIMIT 1
        `,
        [
          id,
          organizacaoId
        ]
      )


    if (!complemento) {

      return res.status(404).json({
        error: 'Complemento não encontrado.'
      })

    }


    /*
    ======================================================
    EQUIPAMENTOS ATUAIS
    ======================================================
    */

    const [anteriores] =
      await db.query(
        `
        SELECT

          equipamento_id

        FROM complemento_itens

        WHERE complemento_id = ?
        `,
        [id]
      )


    const idsAntigos =
      anteriores.map(
        item =>
          Number(item.equipamento_id)
      )


    const idsNovos =
      [...new Set(
        equipamentos.map(Number)
      )]


    const removidos =
      idsAntigos.filter(
        item =>
          !idsNovos.includes(item)
      )


    const adicionados =
      idsNovos.filter(
        item =>
          !idsAntigos.includes(item)
      )


    /*
    ======================================================
    VALIDAR NOVOS EQUIPAMENTOS
    ======================================================
    */

    for (
      const equipamentoId
      of adicionados
    ) {

      const [[equipamento]] =
        await db.query(
          `
          SELECT

            equipamento_id,

            estado_actual

          FROM equipos

          WHERE equipamento_id = ?

            AND organizacao_id = ?

          LIMIT 1
          `,
          [
            equipamentoId,
            organizacaoId
          ]
        )


      if (!equipamento) {

        return res.status(404).json({
          error:
            `Equipamento ${equipamentoId} não encontrado.`
        })

      }


      if (
        equipamento.estado_actual !==
        'disponivel'
      ) {

        return res.status(409).json({
          error:
            `Equipamento ${equipamentoId} não está disponível.`
        })

      }

    }


    /*
    ======================================================
    ATUALIZAR COMPLEMENTO
    ======================================================
    */

    await db.query(
      `
      UPDATE complementos

      SET

        fecha_salida = ?,

        fecha_retorno = ?,

        observacoes = ?

      WHERE id = ?
      `,
      [
        fecha_salida || null,

        fecha_retorno || null,

        observacoes || null,

        id
      ]
    )


    /*
    ======================================================
    EQUIPAMENTOS REMOVIDOS
    ======================================================
    */

    for (
      const equipamentoId
      of removidos
    ) {

      await db.query(
        `
        UPDATE equipos

        SET estado_actual =
          'disponivel'

        WHERE equipamento_id = ?

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

        `Removido do Complemento #${id}`,

        usuarioId

      )

    }


    /*
    ======================================================
    EQUIPAMENTOS ADICIONADOS
    ======================================================
    */

    for (
      const equipamentoId
      of adicionados
    ) {

      await db.query(
        `
        UPDATE equipos

        SET estado_actual =
          'alugado'

        WHERE equipamento_id = ?

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

        `Adicionado ao Complemento #${id}`,

        usuarioId

      )

    }


    /*
    ======================================================
    RECONSTRUIR ITENS
    ======================================================
    */

    await db.query(
      `
      DELETE FROM complemento_itens

      WHERE complemento_id = ?
      `,
      [id]
    )


    for (
      const equipamentoId
      of idsNovos
    ) {

      await db.query(
        `
        INSERT INTO complemento_itens (

          complemento_id,

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


    res.json({

      success: true

    })

  } catch (error) {

    console.error(
      'UPDATE COMPLEMENTO:',
      error
    )

    res.status(500).json({
      error: error.message
    })

  }

}


/*
==========================================================
FINALIZAR COMPLEMENTO
==========================================================
*/

export const finalizarComplemento = async (req, res) => {

  try {

    const { id } = req.params

    const organizacaoId =
      getOrganizacaoId(req)


    if (!organizacaoId) {

      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })

    }


    const usuarioId =
      req.user.id


    /*
    ======================================================
    VALIDAR COMPLEMENTO
    ======================================================
    */

    const [[complemento]] =
      await db.query(
        `
        SELECT

          cp.id

        FROM complementos cp

        INNER JOIN alugueis a
          ON a.id = cp.aluguel_id

        WHERE cp.id = ?

          AND a.organizacao_id = ?

        LIMIT 1
        `,
        [
          id,
          organizacaoId
        ]
      )


    if (!complemento) {

      return res.status(404).json({
        error: 'Complemento não encontrado.'
      })

    }


    /*
    ======================================================
    EQUIPAMENTOS
    ======================================================
    */

    const [equipamentos] =
      await db.query(
        `
        SELECT

          equipamento_id

        FROM complemento_itens

        WHERE complemento_id = ?
        `,
        [id]
      )


    for (
      const item
      of equipamentos
    ) {

      await db.query(
        `
        UPDATE equipos

        SET estado_actual =
          'disponivel'

        WHERE equipamento_id = ?

          AND organizacao_id = ?
        `,
        [
          item.equipamento_id,

          organizacaoId
        ]
      )


      await registrarHistoricoEquipamento(

        item.equipamento_id,

        'alugado',

        'disponivel',

        `Retorno do Complemento #${id}`,

        usuarioId

      )

    }


    /*
    ======================================================
    ATUALIZAR STATUS
    ======================================================
    */

    await db.query(
      `
      UPDATE complementos

      SET estado = 'retornado'

      WHERE id = ?
      `,
      [id]
    )


    res.json({

      success: true

    })

  } catch (error) {

    console.error(
      'FINALIZAR COMPLEMENTO:',
      error
    )

    res.status(500).json({
      error: error.message
    })

  }

}


/*
==========================================================
DELETE COMPLEMENTO
==========================================================
*/

export const deleteComplemento = async (req, res) => {

  try {

    const { id } = req.params

    const organizacaoId =
      getOrganizacaoId(req)


    if (!organizacaoId) {

      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })

    }


    const usuarioId =
      req.user.id


    /*
    ======================================================
    VALIDAR COMPLEMENTO
    ======================================================
    */

    const [[complemento]] =
      await db.query(
        `
        SELECT

          cp.id

        FROM complementos cp

        INNER JOIN alugueis a
          ON a.id = cp.aluguel_id

        WHERE cp.id = ?

          AND a.organizacao_id = ?

        LIMIT 1
        `,
        [
          id,
          organizacaoId
        ]
      )


    if (!complemento) {

      return res.status(404).json({
        error: 'Complemento não encontrado.'
      })

    }


    /*
    ======================================================
    EQUIPAMENTOS
    ======================================================
    */

    const [equipamentos] =
      await db.query(
        `
        SELECT

          equipamento_id

        FROM complemento_itens

        WHERE complemento_id = ?
        `,
        [id]
      )


    /*
    ======================================================
    DEVOLVER EQUIPAMENTOS
    ======================================================
    */

    for (
      const item
      of equipamentos
    ) {

      await db.query(
        `
        UPDATE equipos

        SET estado_actual =
          'disponivel'

        WHERE equipamento_id = ?

          AND organizacao_id = ?
        `,
        [
          item.equipamento_id,

          organizacaoId
        ]
      )


      await registrarHistoricoEquipamento(

        item.equipamento_id,

        'alugado',

        'disponivel',

        `Complemento #${id} excluído`,

        usuarioId

      )

    }


    /*
    ======================================================
    REMOVER ITENS
    ======================================================
    */

    await db.query(
      `
      DELETE FROM complemento_itens

      WHERE complemento_id = ?
      `,
      [id]
    )


    /*
    ======================================================
    REMOVER COMPLEMENTO
    ======================================================
    */

    await db.query(
      `
      DELETE FROM complementos

      WHERE id = ?
      `,
      [id]
    )


    res.json({

      success: true

    })

  } catch (error) {

    console.error(
      'DELETE COMPLEMENTO:',
      error
    )

    res.status(500).json({
      error: error.message
    })

  }

}
