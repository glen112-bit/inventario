export const createLocalizacao = async (req, res) => {

  try {

    const { localizacao } = req.body

    const organizacaoId = req.user?.organizacao_id

    if (!organizacaoId) {
      return res.status(403).json({
        success: false,
        error: 'Usuário não está associado a uma organização.'
      })
    }

    if (!localizacao || !localizacao.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Localização é obrigatória.'
      })
    }

    const [result] = await db.query(`
      INSERT INTO localizacoes (
        localizacao,
        organizacao_id
      )
      VALUES (?, ?)
    `, [
      localizacao.trim(),
      organizacaoId
    ])

    res.status(201).json({
      success: true,
      id: result.insertId
    })

  } catch (error) {

    console.error('Erro ao criar localização:', error)

    res.status(500).json({
      success: false,
      error: error.message
    })

  }

}
export const getLocalizacoes = async (req, res) => {

  try {

    const organizacaoId = req.user?.organizacao_id

    if (!organizacaoId) {
      return res.status(403).json({
        error: 'Usuário não está associado a uma organização.'
      })
    }

    const [rows] = await db.query(`
      SELECT
        id,
        localizacao,
        organizacao_id
      FROM localizacoes
      WHERE organizacao_id = ?
      ORDER BY localizacao
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
