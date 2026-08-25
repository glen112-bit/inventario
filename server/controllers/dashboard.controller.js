import db from '../config/db.js'

export const getStats = async (req, res) => {

  try {

    console.log('========== DASHBOARD ==========')
    console.log('USER:', req.user)

    const organizacaoId = req.user?.organizacao_id

    if (!organizacaoId) {

      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })

    }

    // =====================================================
    // KPIs
    // =====================================================

    const [[equipos]] = await db.query(`
      SELECT COUNT(*) AS total
      FROM equipos
      WHERE organizacao_id = ?
    `, [organizacaoId])


    const [[disponiveis]] = await db.query(`
      SELECT COUNT(*) AS total
      FROM equipos
      WHERE organizacao_id = ?
        AND estado_actual = 'disponivel'
    `, [organizacaoId])


    const [[manutencao]] = await db.query(`
      SELECT COUNT(*) AS total
      FROM equipos
      WHERE organizacao_id = ?
        AND (
          estado_actual = 'manutencao'
          OR estado_actual = 'mantenimiento'
        )
    `, [organizacaoId])


    const [[usuarios]] = await db.query(`
      SELECT COUNT(*) AS total
      FROM usuarios
      WHERE organizacao_id = ?
    `, [organizacaoId])


    const [[alugueisAtivos]] = await db.query(`
      SELECT COUNT(*) AS total
      FROM alugueis
      WHERE organizacao_id = ?
        AND estado = 'ativo'
    `, [organizacaoId])


    const [[devolucoesHoje]] = await db.query(`
      SELECT COUNT(*) AS total
      FROM alugueis
      WHERE organizacao_id = ?
        AND DATE(fecha_retorno) = CURDATE()
    `, [organizacaoId])


    const [[danificados]] = await db.query(`
      SELECT COUNT(*) AS total
      FROM equipos
      WHERE organizacao_id = ?
        AND estado_actual = 'danificado'
    `, [organizacaoId])


    // =====================================================
    // EQUIPAMENTOS POR ESTADO
    // =====================================================

    const [porEstado] = await db.query(`
      SELECT
        estado_actual,
        COUNT(*) AS total
      FROM equipos
      WHERE organizacao_id = ?
      GROUP BY estado_actual
      ORDER BY total DESC
    `, [organizacaoId])


    // =====================================================
    // EQUIPAMENTOS POR MARCA
    // =====================================================

    const [porMarca] = await db.query(`
      SELECT
        COALESCE(m.nome, e.marca, 'Sem marca') AS marca,
        COUNT(*) AS total
      FROM equipos e
      LEFT JOIN marcas m
        ON m.id = e.marca_id
      WHERE e.organizacao_id = ?
      GROUP BY COALESCE(m.nome, e.marca, 'Sem marca')
      ORDER BY total DESC
      LIMIT 10
    `, [organizacaoId])


    // =====================================================
    // ÚLTIMOS ALUGUÉIS
    // =====================================================

    const [ultimosAlugueis] = await db.query(`
      SELECT
        a.id,
        c.nome AS cliente,
        a.fecha_salida,
        a.fecha_retorno,
        a.estado
      FROM alugueis a
      LEFT JOIN clientes c
        ON c.id = a.cliente_id
      WHERE a.organizacao_id = ?
      ORDER BY a.id DESC
      LIMIT 10
    `, [organizacaoId])


    // =====================================================
    // PRÓXIMAS DEVOLUÇÕES
    // =====================================================

    const [proximasDevolucoes] = await db.query(`
      SELECT
        a.id,
        c.nome AS cliente,
        a.fecha_retorno
      FROM alugueis a
      LEFT JOIN clientes c
        ON c.id = a.cliente_id
      WHERE a.organizacao_id = ?
        AND a.estado = 'ativo'
        AND a.fecha_retorno IS NOT NULL
      ORDER BY a.fecha_retorno ASC
      LIMIT 10
    `, [organizacaoId])


    // =====================================================
    // EQUIPAMENTOS EM MANUTENÇÃO
    // =====================================================

    const [equipamentosManutencao] = await db.query(`
      SELECT
        equipamento_id,
        codigo_interno,
        numero_serie,
        marca,
        modelo,
        estado_actual,
        valor
      FROM equipos
      WHERE organizacao_id = ?
        AND (
          estado_actual = 'manutencao'
          OR estado_actual = 'mantenimiento'
        )
      ORDER BY codigo_interno
      LIMIT 10
    `, [organizacaoId])


    // =====================================================
    // EQUIPAMENTOS MAIS ALUGADOS
    // =====================================================

    const [equipamentosMaisAlugados] = await db.query(`
      SELECT
        e.equipamento_id,
        e.codigo_interno,
        e.marca,
        e.modelo,
        COUNT(ai.id) AS total_alugueis
      FROM aluguel_itens ai

      INNER JOIN alugueis a
        ON a.id = ai.aluguel_id

      INNER JOIN equipos e
        ON e.equipamento_id = ai.equipamento_id

      WHERE e.organizacao_id = ?
        AND a.organizacao_id = ?

      GROUP BY
        e.equipamento_id,
        e.codigo_interno,
        e.marca,
        e.modelo

      ORDER BY total_alugueis DESC

      LIMIT 10
    `, [
      organizacaoId,
      organizacaoId
    ])


    // =====================================================
    // ÚLTIMAS MOVIMENTAÇÕES
    // =====================================================

    const [ultimasMovimentacoes] = await db.query(`
      SELECT
        h.id,
        h.equipamento_id,
        h.estado_anterior,
        h.estado_novo,
        h.observacao,
        h.created_at,
        e.codigo_interno
      FROM historico_equipamentos h

      INNER JOIN equipos e
        ON e.equipamento_id = h.equipamento_id

      WHERE e.organizacao_id = ?

      ORDER BY h.created_at DESC

      LIMIT 15
    `, [organizacaoId])


    // =====================================================
    // RESPONSE
    // =====================================================

    const resposta = {

      totalEquipos: Number(equipos.total),

      equiposDisponiveis:
        Number(disponiveis.total),

      equiposManutencao:
        Number(manutencao.total),

      usuarios:
        Number(usuarios.total),

      alugueisAtivos:
        Number(alugueisAtivos.total),

      devolucoesHoje:
        Number(devolucoesHoje.total),

      equipamentosDanificados:
        Number(danificados.total),

      porEstado,

      porMarca,

      equipamentosManutencao,

      ultimosAlugueis,

      equipamentosMaisAlugados,

      proximasDevolucoes,

      ultimasMovimentacoes

    }


    console.log(
      'DASHBOARD RESPONSE:',
      resposta
    )


    res.json(resposta)


  } catch (error) {

    console.error(
      'DASHBOARD ERROR:',
      error
    )

    res.status(500).json({
      error: error.message
    })

  }

}
