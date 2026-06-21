import db from '../config/db.js'

export const getStats = async (req, res) => {

  try {
    const [[equipos]] = await db.query(`
      SELECT COUNT(*) total
      FROM equipos
    `)

    const [[disponiveis]] = await db.query(`
      SELECT COUNT(*) total
      FROM equipos
      WHERE estado_actual = 'disponivel'
    `)

    const [[manutencao]] = await db.query(`
      SELECT COUNT(*) total
      FROM equipos
      WHERE estado_actual = 'manutencao'
    `)

    const [[usuarios]] = await db.query(`
      SELECT COUNT(*) total
      FROM usuarios
    `)

    const [equipamentosManutencao] = await db.query(`
      SELECT
        equipamento_id,
        codigo_interno,
        marca,
        modelo
      FROM equipos
      WHERE estado_actual =  'manutencao'
      LIMIT 10
    `)

    const [ultimosAlugueis] = await db.query(`
      SELECT
        a.id,
        c.nome AS cliente,
        a.fecha_salida,
        a.fecha_retorno,
        a.estado
      FROM alugueis a
      JOIN clientes c
        ON c.id = a.cliente_id
      ORDER BY a.id DESC
      LIMIT 10
    `)
    const [[alugueisAtivos]] = await db.query(`
  SELECT COUNT(*) total
  FROM alugueis
  WHERE estado = 'ativo'
`)
    const [[devolucoesHoje]] = await db.query(`
  SELECT COUNT(*) total
  FROM alugueis
  WHERE DATE(fecha_retorno) = CURDATE()
`)
    const [proximasDevolucoes] = await db.query(`
  SELECT
    a.id,
    c.nome AS cliente,
    a.fecha_retorno
  FROM alugueis a
  JOIN clientes c
    ON c.id = a.cliente_id
  WHERE a.estado = 'ativo'
  ORDER BY a.fecha_retorno ASC
  LIMIT 10
`)
    const [[danificados]] = await db.query(`
  SELECT COUNT(*) total
  FROM equipos
  WHERE estado_actual = 'danificado'
`)

const [equipamentosMaisAlugados] = await db.query(`
  SELECT
    e.equipamento_id,
    e.codigo_interno,
    e.marca,
    e.modelo,
    COUNT(ai.id) AS total_alugueis
  FROM aluguel_itens ai
  JOIN equipos e
    ON e.equipamento_id = ai.equipamento_id
  GROUP BY
    e.equipamento_id,
    e.codigo_interno,
    e.marca,
    e.modelo
  ORDER BY total_alugueis DESC
  LIMIT 10
`)

const [ultimasMovimentacoes] = await db.query(`
  SELECT
    h.id,
    h.estado_anterior,
    h.estado_novo,
    h.observacao,
    h.created_at,
    e.codigo_interno
  FROM historico_equipamentos h
  JOIN equipos e
    ON e.equipamento_id = h.equipamento_id
  ORDER BY h.created_at DESC
  LIMIT 15
`)
    res.json({
  totalEquipos: equipos.total,
  equiposDisponiveis: disponiveis.total,
  equiposManutencao: manutencao.total,
  usuarios: usuarios.total,

  alugueisAtivos: alugueisAtivos.total,
  devolucoesHoje: devolucoesHoje.total,
  equipamentosDanificados: danificados.total,

  equipamentosManutencao,
  ultimosAlugueis,
  proximasDevolucoes,
  equipamentosMaisAlugados,
  ultimasMovimentacoes    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error: error.message
    })

  }

}
