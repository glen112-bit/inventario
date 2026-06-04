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

export const createEquipamento = async (req,res) => {

  try {

    console.log(req.body)
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
      VALUES (?,?,?,?,?,?,?,?,?)
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
