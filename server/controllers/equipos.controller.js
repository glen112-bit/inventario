import db from '../config/db.js';
import QRCode from 'qrcode'


export const getEquipamentos = async (req,res) => {

  try {

    const {
      marca,
      modelo
    } = req.query

    const [rows] = await db.query(`
      SELECT
        equipamento_id,
        codigo_interno,
        numero_serie,
        estado_actual,
        localizacao,
        qr_code
      FROM equipos
      WHERE marca = ?
      AND modelo = ?
      ORDER BY codigo_interno
    `, [
      marca,
      modelo
    ])

    res.json(rows)

  } catch(error) {

    console.error(error)

    res.status(500).json({
      error:error.message
    })

  }

}

export const getEquipamentoById = async (req,res) => {

  const { id } = req.params

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
`, [id])

  res.json(equipamento)
}


export const getInventarioAgrupado = async (req, res) => {

  try {

    const [rows] = await db.query(`
SELECT
    COALESCE(m.nome, e.marca) AS marca,
    e.modelo,

    COUNT(*) AS total,

    SUM(CASE WHEN e.estado_actual='disponivel' THEN 1 ELSE 0 END) AS disponiveis,
    SUM(CASE WHEN e.estado_actual='alugado' THEN 1 ELSE 0 END) AS alugados,
    SUM(CASE WHEN e.estado_actual='manutencao' THEN 1 ELSE 0 END) AS manutencao,
    SUM(CASE WHEN e.estado_actual='danificado' THEN 1 ELSE 0 END) AS danificados

FROM equipos e

LEFT JOIN marcas m
ON m.id = e.marca_id

GROUP BY
    COALESCE(m.nome, e.marca),
    e.modelo
    `)

    res.json(rows)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error: error.message
    })

  }

}

export const getEquipamentosModelo = async (req,res) => {
  try {

    const {
      marca,
      modelo
    } = req.params
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

      ORDER BY e.codigo_interno
    `, [
      marca,
      modelo
    ])
    res.json(rows)

  } catch(error) {

    console.error(error)

    res.status(500).json({
      error:error.message
    })

  }

}
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

export const createEquipamento = async (req,res) => {

  try {
console.log('BODY:', req.body)
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
`, [marca_id])

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
  codigo_interno
)

VALUES (?,?,?,?,?,?,?,?,?,?)
    `,[ 
      marca,
      modelo,
      numero_serie,
      categoria_id,
      marca_id,
      descripcion,
      valor,
      fecha_compra,
      localizacao,
      codigoInterno
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
    `,[
      codigoInternoFinal,
      qrCodeBase64,
      equipamentoId
    ])

    const [[equipamento]] =
      await db.query(`
        SELECT *
        FROM equipos
        WHERE equipamento_id = ?
      `,[equipamentoId])
    // await sincronizarMarcas()
    res.status(201).json({
      success:true,
      equipamento
    })

  } catch(error) {

    console.error(error)

    res.status(500).json({
      error:error.message
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

    const [rows] = await db.query(`
      SELECT *
      FROM historico_equipamentos
      WHERE equipamento_id = ?
      ORDER BY created_at DESC
    `, [id])

    res.json(rows)

  } catch(error) {

    console.error(error)

    res.status(500).json({
      error: error.message
    })

  }

}

export const adicionarUnidade = async (req, res) => {

  try {

    console.log('--------------------')
    console.log('Adicionar Unidade')
    console.log('BODY:', req.body)

    const {
      marca,
      modelo
    } = req.body

    const [[equipamento]] = await db.query(`
      SELECT *
      FROM equipos
      WHERE TRIM(marca) = TRIM(?)
      AND TRIM(modelo) = TRIM(?)
      LIMIT 1
    `, [
      marca,
      modelo
    ])

    console.log('EQUIPAMENTO:', equipamento)

    if (!equipamento) {
      return res.status(404).json({
        error: 'Equipamento não encontrado'
      })
    }
    console.log('insertando nuevo equipamento')

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
        codigo_interno
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      'TEMP'
    ])
    console.log('INSERT OK')
    console.log(result)   

    const equipamentoId =
      result.insertId

    const codigoInterno =
      `EQ-${String(
        equipamentoId
      ).padStart(5,'0')}`

    console.log('CODIGO:')
    console.log(codigoInterno)

    const qrCode =
      await QRCode.toDataURL(
        codigoInterno
      )

    console.log('QR GERADO')

    await db.query(`
      UPDATE equipos
      SET
        codigo_interno=?,
        qr_code=?
      WHERE equipamento_id=?
    `,[
      codigoInterno,
      qrCode,
      equipamentoId
    ])

    console.log('UPDATE OK')

    const [[novoEquipamento]] =
      await db.query(`
        SELECT *
        FROM equipos
        WHERE equipamento_id=?
      `,[equipamentoId])

    console.log('NOVO EQUIPAMENTO:')
    console.log(novoEquipamento)

    res.json({
      success:true,
      equipamento:novoEquipamento
    })

  } catch(error){

    console.log('==========================')
    console.log('ERRO ADICIONAR UNIDADE')
    console.error(error)

    res.status(500).json({
      error:error.message
    })

  }

}


export const removerUnidade = async ( req, res ) => {

  const { id } = req.params

  const [[equipamento]] =
    await db.query(`
      SELECT estado_actual
      FROM equipos
      WHERE equipamento_id = ?
    `,[id])

  if(
    equipamento.estado_actual === 'alugado'
  ){
    return res.status(400).json({
      error:'Equipamento alugado'
    })
  }

  await db.query(`
    DELETE FROM equipos
    WHERE equipamento_id = ?
  `,[id])

  res.json({
    success:true
  })

}
