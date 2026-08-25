import db from '../config/db.js';
import QRCode from 'qrcode'

export const getEquipamentos = async (req, res) => {
  try {
    const organizacaoId = req.user?.organizacao_id

    if (!organizacaoId) {
      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })
    }

    const [rows] = await db.query(`
  SELECT
    e.equipamento_id,
    e.codigo_interno,
    e.numero_serie,
    e.estado_actual,
    e.localizacao,
    e.valor,
    e.fecha_compra,
    e.qr_code,
    e.modelo,
    COALESCE(m.nome, e.marca) AS marca,
    c.nome AS categoria
  FROM equipos e

  LEFT JOIN marcas m
    ON m.id = e.marca_id

  LEFT JOIN categorias c
    ON c.id = e.categoria_id

  WHERE e.organizacao_id = ?

  ORDER BY
    marca,
    modelo,
    codigo_interno
`, [
  organizacaoId
])
    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: error.message
    })
  }
}

export const getEquipamentoById = async (req, res) => {

  try {

    const { id } = req.params

    const organizacaoId = req.user?.organizacao_id

    if (!organizacaoId) {
      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })
    }

    const [[equipamento]] = await db.query(`
      SELECT
        e.*,
        c.nome AS categoria,
        m.nome AS marca_nome

      FROM equipos e

      LEFT JOIN categorias c
        ON c.id = e.categoria_id

      LEFT JOIN marcas m
        ON m.id = e.marca_id

      WHERE e.equipamento_id = ?

        AND e.organizacao_id = ?
    `, [
      id,
      organizacaoId
    ])

    if (!equipamento) {
      return res.status(404).json({
        error: 'Equipamento não encontrado.'
      })
    }

    res.json(equipamento)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error: error.message
    })

  }
}



export const getInventarioAgrupado = async (req, res) => {
  try {
    const organizacaoId = req.user?.organizacao_id

    if (!organizacaoId) {
      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })
    }

    const [rows] = await db.query(`
      SELECT
        COALESCE(m.nome, e.marca) AS marca,
        e.modelo,

        COUNT(*) AS total,

        SUM(
          CASE
            WHEN e.estado_actual = 'disponivel'
            THEN 1 ELSE 0
          END
        ) AS disponiveis,

        SUM(
          CASE
            WHEN e.estado_actual = 'alugado'
            THEN 1 ELSE 0
          END
        ) AS alugados,

        SUM(
          CASE
            WHEN e.estado_actual = 'manutencao'
            THEN 1 ELSE 0
          END
        ) AS manutencao,

        SUM(
          CASE
            WHEN e.estado_actual = 'danificado'
            THEN 1 ELSE 0
          END
        ) AS danificados

      FROM equipos e

      LEFT JOIN marcas m
        ON m.id = e.marca_id

      WHERE e.organizacao_id = ?

      GROUP BY
        COALESCE(m.nome, e.marca),
        e.modelo

      ORDER BY
        marca,
        e.modelo
    `, [organizacaoId])

    res.json(rows)

  } catch (error) {
    console.error('ERRO INVENTARIO AGRUPADO:', error)

    res.status(500).json({
      error: error.message
    })
  }
}

export const getEquipamentosModelo = async (req, res) => {
  try {
    const {
      marca,
      modelo
    } = req.params

    const organizacaoId = req.user?.organizacao_id

    if (!organizacaoId) {
      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })
    }

    const [rows] = await db.query(`
      SELECT
        e.equipamento_id,
        e.codigo_interno,
        e.numero_serie,
        e.estado_actual,
        e.localizacao,
        e.valor,
        e.fecha_compra,
        e.qr_code,
        c.nome AS categoria,
        COALESCE(m.nome, e.marca) AS marca

      FROM equipos e

      LEFT JOIN categorias c
        ON c.id = e.categoria_id

      LEFT JOIN marcas m
        ON m.id = e.marca_id

      WHERE
        COALESCE(m.nome, e.marca) = ?
        AND e.modelo = ?
        AND e.organizacao_id = ?

      ORDER BY e.codigo_interno
    `, [
      marca,
      modelo,
      organizacaoId
    ])

    res.json(rows)

  } catch (error) {
    console.error('ERRO EQUIPAMENTOS MODELO:', error)

    res.status(500).json({
      error: error.message
    })
  }
}

export const getEquipamentoProfile = async (req, res) => {

  const connection = await db.getConnection();

  try {

    const { id } = req.params;
    const organizacaoId = req.user?.organizacao_id;

    // ==========================================================
    // VALIDAR ORGANIZAÇÃO
    // ==========================================================

    if (!organizacaoId) {

      connection.release();

      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      });

    }

    // ==========================================================
    // INFORMAÇÃO PRINCIPAL
    // ==========================================================

    const [[equipamento]] = await connection.query(
      `
      SELECT
        e.*,
        COALESCE(m.nome, e.marca) AS marca,
        c.nome AS categoria,
        e.localizacao

      FROM equipos e

      LEFT JOIN marcas m
        ON m.id = e.marca_id

      LEFT JOIN categorias c
        ON c.id = e.categoria_id

      WHERE e.equipamento_id = ?
        AND e.organizacao_id = ?
      `,
      [
        id,
        organizacaoId
      ]
    );

    if (!equipamento) {

      connection.release();

      return res.status(404).json({
        error: 'Equipamento não encontrado.'
      });

    }

    // ==========================================================
    // TIMELINE / HISTÓRICO
    // ==========================================================

    const [historico] = await connection.query(
      `
      SELECT
        h.*,
        u.nome AS usuario

      FROM historico_equipamentos h

      LEFT JOIN usuarios u
        ON u.id = h.usuario_id

      WHERE h.equipamento_id = ?

      ORDER BY h.created_at DESC
      `,
      [
        id
      ]
    );

    // ==========================================================
    // OPERAÇÕES
    // ==========================================================

    const [operacoes] = await connection.query(
      `
      SELECT
        o.id,
        o.tipo,
        o.status,
        o.data_operacao,
        c.nome AS cliente,
        oi.estado_saida,
        oi.estado_retorno,
        oi.data_leitura

      FROM operacoes_itens oi

      INNER JOIN operacoes o
        ON o.id = oi.operacao_id

      LEFT JOIN clientes c
        ON c.id = o.cliente_id

      WHERE oi.equipamento_id = ?
        AND o.organizacao_id = ?

      ORDER BY o.data_operacao DESC
      `,
      [
        id,
        organizacaoId
      ]
    );

    // ==========================================================
    // ANALYTICS
    // ==========================================================

    const [[analytics]] = await connection.query(
      `
      SELECT

        COUNT(*) AS total_operacoes,

        SUM(
          CASE
            WHEN o.tipo = 'saida'
            THEN 1
            ELSE 0
          END
        ) AS alugueis,

        SUM(
          CASE
            WHEN oi.estado_retorno IS NOT NULL
            THEN 1
            ELSE 0
          END
        ) AS devolucoes,

        (
          SELECT COUNT(*)
          FROM historico_equipamentos h1

          INNER JOIN equipos e1
            ON e1.equipamento_id = h1.equipamento_id

          WHERE h1.equipamento_id = ?
            AND h1.estado_novo = 'manutencao'
            AND e1.organizacao_id = ?
        ) AS manutencoes,

        (
          SELECT COUNT(*)
          FROM historico_equipamentos h2

          INNER JOIN equipos e2
            ON e2.equipamento_id = h2.equipamento_id

          WHERE h2.equipamento_id = ?
            AND h2.estado_novo = 'danificado'
            AND e2.organizacao_id = ?
        ) AS danos

      FROM operacoes_itens oi

      INNER JOIN operacoes o
        ON o.id = oi.operacao_id

      WHERE oi.equipamento_id = ?
        AND o.organizacao_id = ?
      `,
      [
        id,
        organizacaoId,

        id,
        organizacaoId,

        id,
        organizacaoId
      ]
    );

    // ==========================================================
    // LIBERAR CONEXÃO
    // ==========================================================

    connection.release();

    // ==========================================================
    // RESPOSTA
    // ==========================================================

    return res.json({

      equipamento,

      historico,

      operacoes,

      analytics

    });

  } catch (error) {

    connection.release();

    console.error(
      'Erro em getEquipamentoProfile:',
      error
    );

    return res.status(500).json({
      error: error.message
    });

  }

};;

const sincronizarMarcasDB = async () => {

  await db.query(`
    INSERT INTO marcas (nome)
    SELECT DISTINCT marca
  FROM equipos e
  WHERE marca IS NOT NULL
  AND marca <> ''
  AND NOT EXISTS (
    SELECT 1
    FROM marcas m
    WHERE m.nome = e.marca
  )
  `)

}
export const sincronizarMarcas = async (req, res) => {

  try {

    await sincronizarMarcasDB()

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

export const createEquipamento = async (req, res) => {

  try {

    const organizacaoId = req.user?.organizacao_id

    if (!organizacaoId) {
      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })
    }

    const {
      modelo,
      numero_serie,
      categoria_id,
      marca_id = null,
      descripcion = '',
      valor = null,
      fecha_compra = null,
      ubicacion_id
    } = req.body

    const localizacao = ubicacion_id

    const [[marcaDb]] = await db.query(`
      SELECT nome
      FROM marcas
      WHERE id = ?
    `, [
      marca_id
    ])

    if (!marcaDb) {
      return res.status(400).json({
        error: 'Marca não encontrada.'
      })
    }

    const marca = marcaDb.nome

    const codigoInterno = `TMP-${Date.now()}`

    const [result] = await db.query(`
      INSERT INTO equipos (
        marca,
        modelo,
        numero_serie,
        categoria_id,
        marca_id,
        descripcion,
        valor,
        fecha_compra,
        localizacao,
        codigo_interno,
        organizacao_id
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      marca,
      modelo,
      numero_serie,
      categoria_id,
      marca_id,
      descripcion,
      valor,
      fecha_compra,
      localizacao,
      codigoInterno,
      organizacaoId
    ])

    const equipamentoId = result.insertId

    const codigoInternoFinal =
      `EQ-${String(equipamentoId).padStart(5, '0')}`

    const qrCodeBase64 =
      await QRCode.toDataURL(codigoInternoFinal)

    await db.query(`
      UPDATE equipos

      SET
        codigo_interno = ?,
        qr_code = ?

      WHERE equipamento_id = ?

        AND organizacao_id = ?
    `, [
      codigoInternoFinal,
      qrCodeBase64,
      equipamentoId,
      organizacaoId
    ])

    const [[equipamento]] = await db.query(`
      SELECT *
      FROM equipos
      WHERE equipamento_id = ?

        AND organizacao_id = ?
    `, [
      equipamentoId,
      organizacaoId
    ])

    res.status(201).json({
      success: true,
      equipamento
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error: error.message
    })

  }
}


export const editarEquipamento = async (req, res) => {

  try {

    const { id } = req.params

    const organizacaoId = req.user?.organizacao_id

    if (!organizacaoId) {
      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })
    }

    const {
      codigo_interno,
      numero_serie,
      modelo,
      categoria_id,
      marca_id,
      estado_actual,
      descripcion,
      valor,
      fecha_compra,
      localizacao
    } = req.body

    const [result] = await db.query(`
      UPDATE equipos

      SET
        codigo_interno = ?,
        numero_serie = ?,
        modelo = ?,
        categoria_id = ?,
        marca_id = ?,
        estado_actual = ?,
        descripcion = ?,
        valor = ?,
        fecha_compra = ?,
        localizacao = ?

      WHERE equipamento_id = ?

        AND organizacao_id = ?
    `, [
      codigo_interno,
      numero_serie,
      modelo,
      categoria_id,
      marca_id,
      estado_actual,
      descripcion,
      valor,
      fecha_compra,
      localizacao,
      id,
      organizacaoId
    ])

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Equipamento não encontrado.'
      })
    }

    const [[equipamento]] = await db.query(`
      SELECT *
      FROM equipos

      WHERE equipamento_id = ?

        AND organizacao_id = ?
    `, [
      id,
      organizacaoId
    ])

    res.json({
      success: true,
      equipamento
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error: error.message
    })

  }
}


export const registrarHistoricoEquipamento = async (
  equipamentoId,
  estadoAnterior,
  estadoNovo,
  observacao,
  usuarioId = null
) => {

  await db.query(`
  INSERT INTO historico_equipamentos (
    equipamento_id,
    estado_anterior,
    estado_novo,
    observacao,
    usuario_id
  )
    VALUES (?, ?, ?, ?, ?)
    `, [
    equipamentoId,
    estadoAnterior,
    estadoNovo,
    observacao,
    usuarioId
  ])

}


export const getHistoricoEquipamento = async (req, res) => {
  try {
    const { id } = req.params

    const organizacaoId = req.user?.organizacao_id

    if (!organizacaoId) {
      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })
    }

    const [rows] = await db.query(`
      SELECT
        h.id,
        h.equipamento_id,

        e.codigo_interno,
        e.numero_serie,
        e.modelo,
        COALESCE(m.nome, e.marca) AS marca,
        e.qr_code,

        h.tipo_evento,
        h.estado_anterior,
        h.estado_novo,
        h.observacao,
        h.created_at,

        u.id AS usuario_id,
        u.nome AS usuario

      FROM historico_equipamentos h

      INNER JOIN equipos e
        ON e.equipamento_id = h.equipamento_id

      LEFT JOIN usuarios u
        ON u.id = h.usuario_id

      LEFT JOIN marcas m
        ON m.id = e.marca_id

      WHERE h.equipamento_id = ?
        AND e.organizacao_id = ?

      ORDER BY h.created_at DESC
    `, [
      id,
      organizacaoId
    ])

    res.json(rows)

  } catch (error) {
    console.error('ERRO HISTORICO EQUIPAMENTO:', error)

    res.status(500).json({
      error: error.message
    })
  }
};

export const adicionarUnidade = async (req, res) => {
  try {
    const {
      marca,
      modelo
    } = req.body

    const organizacaoId = req.user?.organizacao_id

    if (!organizacaoId) {
      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })
    }

    const [[equipamento]] = await db.query(`
      SELECT *
      FROM equipos
      WHERE TRIM(marca) = TRIM(?)
        AND TRIM(modelo) = TRIM(?)
        AND organizacao_id = ?
      LIMIT 1
    `, [
      marca,
      modelo,
      organizacaoId
    ])

    if (!equipamento) {
      return res.status(404).json({
        error: 'Equipamento não encontrado'
      })
    }

    const [result] = await db.query(`
      INSERT INTO equipos (
        marca,
        modelo,
        categoria_id,
        marca_id,
        numero_serie,
        descripcion,
        valor,
        fecha_compra,
        localizacao,
        estado_actual,
        codigo_interno,
        organizacao_id
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      equipamento.marca,
      equipamento.modelo,
      equipamento.categoria_id,
      equipamento.marca_id,
      null,
      equipamento.descripcion,
      equipamento.valor,
      equipamento.fecha_compra,
      equipamento.localizacao,
      'disponivel',
      'TEMP',
      organizacaoId
    ])

    const equipamentoId = result.insertId

    const codigoInterno =
      `EQ-${String(equipamentoId).padStart(5, '0')}`

    const qrCode =
      await QRCode.toDataURL(codigoInterno)

    await db.query(`
      UPDATE equipos
      SET
        codigo_interno = ?,
        qr_code = ?
      WHERE equipamento_id = ?
        AND organizacao_id = ?
    `, [
      codigoInterno,
      qrCode,
      equipamentoId,
      organizacaoId
    ])

    const [[novoEquipamento]] = await db.query(`
      SELECT *
      FROM equipos
      WHERE equipamento_id = ?
        AND organizacao_id = ?
    `, [
      equipamentoId,
      organizacaoId
    ])

    res.status(201).json({
      success: true,
      equipamento: novoEquipamento
    })

  } catch (error) {
    console.error('ERRO ADICIONAR UNIDADE:', error)

    res.status(500).json({
      error: error.message
    })
  }
}

export const atualizarEstadoEquipamento = async (req, res) => {
  try {
    const { id } = req.params

    const {
      estado_actual,
      observacao
    } = req.body

    const organizacaoId = req.user?.organizacao_id

    if (!organizacaoId) {
      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })
    }

    const [[equipamento]] = await db.query(`
      SELECT
        estado_actual
      FROM equipos
      WHERE equipamento_id = ?
        AND organizacao_id = ?
    `, [
      id,
      organizacaoId
    ])

    if (!equipamento) {
      return res.status(404).json({
        error: 'Equipamento não encontrado'
      })
    }

    const estadoAnterior = equipamento.estado_actual

    await db.query(`
      UPDATE equipos
      SET estado_actual = ?
      WHERE equipamento_id = ?
        AND organizacao_id = ?
    `, [
      estado_actual,
      id,
      organizacaoId
    ])

    await registrarHistoricoEquipamento(
      id,
      estadoAnterior,
      estado_actual,
      observacao,
      req.user?.id || null
    )

    const [[equipamentoAtualizado]] = await db.query(`
      SELECT *
      FROM equipos
      WHERE equipamento_id = ?
        AND organizacao_id = ?
    `, [
      id,
      organizacaoId
    ])

    res.json({
      success: true,
      equipamento: equipamentoAtualizado
    })

  } catch (error) {
    console.error('ERRO ATUALIZAR ESTADO:', error)

    res.status(500).json({
      error: error.message
    })
  }
}
export const removerUnidade = async (req, res) => {
  try {
    const { id } = req.params

    const organizacaoId = req.user?.organizacao_id

    if (!organizacaoId) {
      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })
    }

    const [[equipamento]] = await db.query(`
      SELECT estado_actual
      FROM equipos
      WHERE equipamento_id = ?
        AND organizacao_id = ?
    `, [
      id,
      organizacaoId
    ])

    if (!equipamento) {
      return res.status(404).json({
        error: 'Equipamento não encontrado'
      })
    }

    if (equipamento.estado_actual === 'alugado') {
      return res.status(400).json({
        error: 'Equipamento alugado'
      })
    }

    await db.query(`
      DELETE FROM equipos
      WHERE equipamento_id = ?
        AND organizacao_id = ?
    `, [
      id,
      organizacaoId
    ])

    res.json({
      success: true
    })

  } catch (error) {
    console.error('ERRO REMOVER UNIDADE:', error)

    res.status(500).json({
      error: error.message
    })
  }
}


export const listarHistoricoEquipamentos = async (req, res) => {
  try {
    const organizacaoId = req.user?.organizacao_id

    if (!organizacaoId) {
      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })
    }

    const [rows] = await db.query(`
      SELECT
        h.id,
        h.created_at,
        h.tipo_evento,
        h.estado_anterior,
        h.estado_novo,
        h.observacao,

        e.equipamento_id,
        e.codigo_interno,
        e.numero_serie,
        e.modelo,
        COALESCE(m.nome, e.marca) AS marca,

        u.nome AS usuario

      FROM historico_equipamentos h

      INNER JOIN equipos e
        ON e.equipamento_id = h.equipamento_id

      LEFT JOIN marcas m
        ON m.id = e.marca_id

      LEFT JOIN usuarios u
        ON u.id = h.usuario_id

      WHERE e.organizacao_id = ?

      ORDER BY h.created_at DESC
    `, [
      organizacaoId
    ])

    res.json(rows)

  } catch (error) {
    console.error('ERRO LISTAR HISTORICO:', error)

    res.status(500).json({
      error: error.message
    })
  }
}

export const getEquipamentoByQR = async (req, res) => {

  try {

    const { codigo } = req.params

    const organizacaoId = req.user?.organizacao_id

    if (!organizacaoId) {
      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })
    }

    const [[equipamento]] = await db.query(`
      SELECT
        equipamento_id

      FROM equipos

      WHERE qr_code = ?

        AND organizacao_id = ?
    `, [
      codigo,
      organizacaoId
    ])

    if (!equipamento) {
      return res.status(404).json({
        error: 'QR Code não encontrado nesta organização.'
      })
    }

    req.params.id = equipamento.equipamento_id

    return getEquipamentoProfile(req, res)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error: error.message
    })

  }
}

