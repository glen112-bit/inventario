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
