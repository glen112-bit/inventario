import db from '../config/db.js';

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

export const getManutencoes = async (req, res) => {
  try {

    const [rows] = await db.query(`
      SELECT
        equipamento_id,
        codigo_interno,
        numero_serie,
        marca,
        modelo,
        descripcion,
        estado_actual,
        valor,
        fecha_compra
      FROM equipos
      WHERE estado_actual = 'manutencao'
      ORDER BY equipamento_id DESC
    `)

    res.json(rows)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error: error.message
    })

  }
}
