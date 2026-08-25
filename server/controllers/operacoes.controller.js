import db from '../config/db.js';

export const listarOperacoes = async (req, res) => {
  try{

    const [rows] = await db.query(
      `
SELECT
    o.id,
    o.tipo,
    o.status,
    o.data_operacao,
    c.nome AS cliente,
    u.nome AS usuario,
    COUNT(oi.id) AS total_itens
FROM operacoes o
LEFT JOIN clientes c ON c.id = o.cliente_id
LEFT JOIN usuarios u ON u.id = o.usuario_id
LEFT JOIN operacoes_itens oi ON oi.operacao_id = o.id
GROUP BY
    o.id,
    o.tipo,
    o.status,
    o.data_operacao,
    c.nome,
    u.nome
ORDER BY o.id DESC;
      `);
    res.json(rows)

  } catch(error){

    console.error(error);

    res.status(500).json({
      error: error.message
    });
  }
};

export const criarOperacao = async (req, res) => {

  try {

    const {
      tipo,
      cliente_id,
      observacoes
    } = req.body

    const usuarioId = req.user.id
    const organizacaoId = req.user.organizacao_id

    const [result] = await db.query(`
      INSERT INTO operacoes (
        tipo,
        cliente_id,
        usuario_id,
        organizacao_id,
        status,
        data_operacao,
        observacoes
      )
      VALUES (?, ?, ?, ?, 'aberta', NOW(), ?)
    `, [
      tipo,
      cliente_id,
      usuarioId,
      organizacaoId,
      observacoes || null
    ])

    res.status(201).json({
      success: true,
      operacao_id: result.insertId
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error: error.message
    })

  }

};

export const obterOperacao = async (req, res) => {
  try {
    const { id } = req.params;
    // Obtener cabecera de la operación
    const [[operacao]] = await db.query(
      `
      SELECT
        o.id,
        o.tipo,
        o.status,
        o.data_operacao,
        o.observacoes,
        c.nome AS cliente,
        u.nome AS usuario
      FROM operacoes o
      LEFT JOIN clientes c
        ON c.id = o.cliente_id
      LEFT JOIN usuarios u
        ON u.id = o.usuario_id
      WHERE o.id = ?
      `,
      [id]
    );

    if (!operacao) {
      return res.status(404).json({
        error: 'Operação não encontrada.'
      });
    }

    // Obtener equipos de la operación
    const [itens] = await db.query(
      `
      SELECT
        oi.id,
        oi.equipamento_id,
        oi.estado_saida,
        oi.estado_retorno,
        oi.data_leitura,
        oi.observacoes,

        e.codigo_interno,
        e.numero_serie,
        e.modelo,
        COALESCE(m.nome, e.marca) AS marca,
        e.qr_code

      FROM operacoes_itens oi

      INNER JOIN equipos e
        ON e.equipamento_id = oi.equipamento_id

      LEFT JOIN marcas m
        ON m.id = e.marca_id

      WHERE oi.operacao_id = ?

      ORDER BY e.codigo_interno
      `,
      [id]
    );

    operacao.itens = itens;

    res.json(operacao);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message
    });
  }
};

export const lerQrCode = async (req, res) => {

  const connection = await db.getConnection()

  try {

    const { id } = req.params
    const { qr } = req.body

    const usuarioId = req.user.id
    const organizacaoId = req.user.organizacao_id

    const [[operacao]] = await connection.query(`
      SELECT *
      FROM operacoes
      WHERE id = ?
        AND organizacao_id = ?
    `, [id, organizacaoId])

    if (!operacao) {
      return res.status(404).json({
        error: 'Operação não encontrada.'
      })
    }

    const [[equipamento]] = await connection.query(`
      SELECT *
      FROM equipos
      WHERE qr_code = ?
        AND organizacao_id = ?
    `, [qr, organizacaoId])

    if (!equipamento) {
      return res.status(404).json({
        error: 'QR não encontrado.'
      })
    }

    // SAÍDA
    if (operacao.tipo === 'saida') {

      if (equipamento.estado_actual !== 'disponivel') {
        return res.status(400).json({
          error: 'Equipamento não está disponível.'
        })
      }

      await connection.beginTransaction()

      await connection.query(`
        INSERT INTO operacoes_itens (
          operacao_id,
          equipamento_id,
          estado_saida,
          data_leitura
        )
        VALUES (?, ?, ?, NOW())
      `, [
        id,
        equipamento.equipamento_id,
        equipamento.estado_actual
      ])

      await connection.query(`
        UPDATE equipos
        SET estado_actual = 'alugado'
        WHERE equipamento_id = ?
      `, [equipamento.equipamento_id])

      await connection.query(`
        INSERT INTO historico_equipamentos (
          equipamento_id,
          estado_anterior,
          estado_novo,
          observacao,
          usuario_id,
          tipo_evento
        )
        VALUES (?, ?, ?, ?, ?, 'saida')
      `, [
        equipamento.equipamento_id,
        equipamento.estado_actual,
        'alugado',
        `Operação #${id}`,
        usuarioId
      ])

      await connection.commit()

    }

    // DEVOLUÇÃO
    else {

      if (equipamento.estado_actual !== 'alugado') {
        return res.status(400).json({
          error: 'Equipamento não está alugado.'
        })
      }

      const [[item]] = await connection.query(`
        SELECT oi.*
        FROM operacoes_itens oi
        INNER JOIN operacoes o
          ON o.id = oi.operacao_id
        WHERE oi.equipamento_id = ?
          AND o.cliente_id = ?
          AND o.tipo = 'saida'
          AND o.organizacao_id = ?
        ORDER BY oi.id DESC
        LIMIT 1
      `, [
        equipamento.equipamento_id,
        operacao.cliente_id,
        organizacaoId
      ])

      if (!item) {
        return res.status(400).json({
          error: 'Equipamento não pertence a este cliente.'
        })
      }

      await connection.beginTransaction()

      await connection.query(`
        INSERT INTO operacoes_itens (
          operacao_id,
          equipamento_id,
          estado_retorno,
          data_leitura
        )
        VALUES (?, ?, 'disponivel', NOW())
      `, [
        id,
        equipamento.equipamento_id
      ])

      await connection.query(`
        UPDATE equipos
        SET estado_actual = 'disponivel'
        WHERE equipamento_id = ?
      `, [equipamento.equipamento_id])

      await connection.query(`
        INSERT INTO historico_equipamentos (
          equipamento_id,
          estado_anterior,
          estado_novo,
          observacao,
          usuario_id,
          tipo_evento
        )
        VALUES (?, ?, ?, ?, ?, 'devolucao')
      `, [
        equipamento.equipamento_id,
        'alugado',
        'disponivel',
        `Devolução operação #${id}`,
        usuarioId
      ])

      await connection.commit()

    }

    res.json({
      success: true,
      equipamento
    })

  } catch (error) {

    try {
      await connection.rollback()
    } catch {}

    console.error(error)

    res.status(500).json({
      error: error.message
    })

  } finally {

    connection.release()

  }

};

export const finalizarOperacao = async (req, res) => {

  try {

    const { id } = req.params;

    // Verificar que la operación exista
    const [[operacao]] = await db.query(
      `
      SELECT *
      FROM operacoes
      WHERE id = ?
      `,
      [id]
    );

    if (!operacao) {
      return res.status(404).json({
        error: 'Operação não encontrada.'
      });
    }

    // Verificar que no esté finalizada
    if (operacao.status === 'finalizada') {
      return res.status(400).json({
        error: 'Operação já foi finalizada.'
      });
    }

    // Verificar que tenga equipos
    const [[itens]] = await db.query(
      `
      SELECT COUNT(*) AS total
      FROM operacoes_itens
      WHERE operacao_id = ?
      `,
      [id]
    );

    if (itens.total === 0) {
      return res.status(400).json({
        error: 'A operação não possui equipamentos.'
      });
    }

    // Si es devolución verificar que todos fueron devueltos
    if (operacao.tipo === 'devolucao') {

      const [[pendentes]] = await db.query(
        `
        SELECT COUNT(*) AS total
        FROM operacoes_itens
        WHERE operacao_id = ?
        AND estado_retorno IS NULL
        `,
        [id]
      );

      if (pendentes.total > 0) {
        return res.status(400).json({
          error: `Ainda existem ${pendentes.total} equipamentos pendentes de devolução.`
        });
      }

    }

    // Finalizar operación
    await db.query(
      `
      UPDATE operacoes
      SET
        status = 'finalizada',
        data_operacao = NOW()
      WHERE id = ?
      `,
      [id]
    );

    res.json({
      success: true,
      message: 'Operação finalizada com sucesso.'
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });

  }

};


export const devolverEquipamento = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      qr,
      usuario_id,
      estado_retorno
    } = req.body;

    // Validar estado
    const estadosPermitidos = [
      'disponivel',
      'manutencao',
      'danificado'
    ];

    if (!estadosPermitidos.includes(estado_retorno)) {
      return res.status(400).json({
        error: 'Estado de retorno inválido.'
      });
    }

    // Buscar operación
    const [[operacao]] = await db.query(
      `
      SELECT *
      FROM operacoes
      WHERE id = ?
      `,
      [id]
    );

    if (!operacao) {
      return res.status(404).json({
        error: 'Operação não encontrada.'
      });
    }

    if (operacao.status === 'finalizada') {
      return res.status(400).json({
        error: 'Operação já foi finalizada.'
      });
    }

    // Buscar equipo
    const [[equipamento]] = await db.query(
      `
      SELECT *
      FROM equipos
      WHERE qr_code = ?
      `,
      [qr]
    );

    if (!equipamento) {
      return res.status(404).json({
        error: 'QR não encontrado.'
      });
    }

    // Buscar item de la operación
    const [[item]] = await db.query(
      `
      SELECT *
      FROM operacoes_itens
      WHERE operacao_id = ?
      AND equipamento_id = ?
      `,
      [
        id,
        equipamento.equipamento_id
      ]
    );

    if (!item) {
      return res.status(400).json({
        error: 'Equipamento não pertence a esta operação.'
      });
    }

    if (item.estado_retorno) {
      return res.status(400).json({
        error: 'Equipamento já foi devolvido.'
      });
    }

    // Actualizar item
    await db.query(
      `
      UPDATE operacoes_itens
      SET
        estado_retorno = ?,
        data_leitura = NOW()
      WHERE id = ?
      `,
      [
        estado_retorno,
        item.id
      ]
    );

    // Actualizar inventario
    await db.query(
      `
      UPDATE equipos
      SET estado_actual = ?
      WHERE equipamento_id = ?
      `,
      [
        estado_retorno,
        equipamento.equipamento_id
      ]
    );

    // Historial
    await db.query(
      `
      INSERT INTO historico_equipamentos
      (
        equipamento_id,
        estado_anterior,
        estado_novo,
        observacao,
        usuario_id
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        equipamento.equipamento_id,
        equipamento.estado_actual,
        estado_retorno,
        'Devolução por QR Code',
        usuario_id
      ]
    );

    // Verificar si todos fueron devueltos
    const [[pendentes]] = await db.query(
      `
      SELECT COUNT(*) AS total
      FROM operacoes_itens
      WHERE operacao_id = ?
      AND estado_retorno IS NULL
      `,
      [id]
    );

    if (pendentes.total === 0) {

      await db.query(
        `
        UPDATE operacoes
        SET
          status='finalizada',
          data_operacao = NOW()
        WHERE id = ?
        `,
        [id]
      );

    }

    res.json({
      success: true,
      operacao_finalizada: pendentes.total === 0,
      equipamento: {
        ...equipamento,
        estado_actual: estado_retorno
      }
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });

  }

};
