import db from '../config/db.js';
import QRCode from 'qrcode'

export const getEquipos = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM equipos'
    );

    res.json(rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });
  }
};
export const sincronizarMarcas = async (req,res) => {

  try {

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

    res.json({
      success:true
    })

  } catch(error) {

    console.error(error)

    res.status(500).json(error)

  }

}
export const createEquipamento = async (req,res) => {

  try {

    const {
      marca,
      modelo,
      numero_serie,
      categoria_id,
      marca_id = null,
      descripcion = '',
      valor = null,
      fecha_compra = null,
      ubicacion_id = null 
    } = req.body

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
        ubicacion_id,
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
      ubicacion_id,
      codigo_interno
    ])

    const equipamentoId =
      result.insertId

    const codigoInterno =
      `EQ-${String(
        equipamentoId
      ).padStart(5,'0')}`

    const qrCodeBase64 =
      await QRCode.toDataURL(
        codigoInterno
      )

    await db.query(`
      UPDATE equipos
      SET
        codigo_interno = ?,
        qr_code = ?
      WHERE equipamento_id = ?
    `,[
      codigoInterno,
      qrCodeBase64,
      equipamentoId
    ])

    const [[equipamento]] =
      await db.query(`
        SELECT *
        FROM equipos
        WHERE equipamento_id = ?
      `,[equipamentoId])
    await sincronizarMarcas() 
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
export const historio_equipamentos = async (req, res) => {
  try{
    const [rows] = await db.query(`
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
    res.json(rows)
  }catch(error){
    console.error(error)
    res.status(500).json({
      error: error.message
    })
  }
}

