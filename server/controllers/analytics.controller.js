import db from '../config/db.js'

export const getAnalytics = async (req, res) => {

  try {

    const organizacaoId = req.user?.organizacao_id

    if (!organizacaoId) {

      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })

    }


    /*
    ======================================================
    TOTAL EQUIPAMENTOS
    ======================================================
    */

    const [equipamentos] = await db.query(
      `
      SELECT COUNT(*) AS total

      FROM equipos

      WHERE organizacao_id = ?
      `,
      [organizacaoId]
    )


    /*
    ======================================================
    TOTAL CLIENTES
    ======================================================
    */

    const [clientes] = await db.query(
      `
      SELECT COUNT(*) AS total

      FROM clientes

      WHERE organizacao_id = ?
      `,
      [organizacaoId]
    )


    /*
    ======================================================
    TOTAL ALUGUEIS
    ======================================================
    */

    const [alugueis] = await db.query(
      `
      SELECT COUNT(*) AS total

      FROM alugueis

      WHERE organizacao_id = ?
      `,
      [organizacaoId]
    )


    /*
    ======================================================
    EQUIPAMENTOS EM MANUTENÇÃO
    ======================================================
    */

    const [manutencao] = await db.query(
      `
      SELECT COUNT(*) AS total

      FROM equipos

      WHERE

        organizacao_id = ?

        AND (
          estado_actual = 'manutencao'
          OR estado_actual = 'mantenimiento'
        )
      `,
      [organizacaoId]
    )


    /*
    ======================================================
    EQUIPAMENTOS POR ESTADO
    ======================================================
    */

    const [porEstado] = await db.query(
      `
      SELECT

        estado_actual,

        COUNT(*) AS total

      FROM equipos

      WHERE organizacao_id = ?

      GROUP BY estado_actual

      ORDER BY total DESC
      `,
      [organizacaoId]
    )


    /*
    ======================================================
    EQUIPAMENTOS POR MARCA
    ======================================================
    */

    const [porMarca] = await db.query(
      `
      SELECT

        marca,

        COUNT(*) AS total

      FROM equipos

      WHERE organizacao_id = ?

      GROUP BY marca

      ORDER BY total DESC
      `,
      [organizacaoId]
    )


    /*
    ======================================================
    ALUGUEIS POR ESTADO
    ======================================================
    */

    const [alugueisPorEstado] = await db.query(
      `
      SELECT

        estado,

        COUNT(*) AS total

      FROM alugueis

      WHERE organizacao_id = ?

      GROUP BY estado

      ORDER BY total DESC
      `,
      [organizacaoId]
    )


    /*
    ======================================================
    EQUIPAMENTOS POR LOCALIZAÇÃO
    ======================================================
    */

    const [porLocalizacao] = await db.query(
      `
      SELECT

        localizacao,

        COUNT(*) AS total

      FROM equipos

      WHERE organizacao_id = ?

      GROUP BY localizacao

      ORDER BY total DESC
      `,
      [organizacaoId]
    )


    /*
    ======================================================
    RESPONSE
    ======================================================
    */

    res.json({

      totalEquipamentos:
        equipamentos[0].total,

      totalClientes:
        clientes[0].total,

      totalAlugueis:
        alugueis[0].total,

      totalManutencao:
        manutencao[0].total,

      porEstado,

      porMarca,

      alugueisPorEstado,

      porLocalizacao

    })


  } catch (error) {

    console.error(
      'GET ANALYTICS:',
      error
    )

    res.status(500).json({
      error: error.message
    })

  }

}
