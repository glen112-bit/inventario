const express = require('express');
const router = express.Router();
const db = require('./db'); // Archivo de conexión del Paso 1

router.get('/api/dashboard/stats', async (req, res) => {
  try {
    // 1. Ejecutamos múltiples consultas SQL en paralelo para máxima velocidad
    const [
      [locacoesAtivas],
      [totalEquipamentos],
      [proximosEventos],
      [emManutencao]
    ] = await Promise.all([
      db.query("SELECT COUNT(*) as count FROM contratos WHERE status = 'ativo'"),
      db.query("SELECT COUNT(*) as count FROM equipamentos"),
      db.query("SELECT COUNT(*) as count FROM eventos WHERE data_evento >= CURDATE()"),
      db.query("SELECT COUNT(*) as count FROM equipamentos WHERE status = 'manutencao'")
    ]);

    // 2. Armamos el objeto con las llaves exactas que espera tu Frontend en React
    res.json({
      alugueisAtivos: locacoesAtivas[0].count,
      totalEquipamentos: totalEquipamentos[0].count,
      proximosEventos: proximosEventos[0].count,
      emManutencao: emManutencao[0].count
    });

  } catch (error) {
    console.error("Erro SQL no Dashboard:", error);
    res.status(500).json({ error: "Erro ao ler dados do banco SQL" });
  }
});
// Ruta para listar todos los equipos en el Inventario
router.get('/api/inventario', async (req, res) => {
  try {
    // Consulta SQL para traer el inventario ordenado por nombre
    const [rows] = await db.query(`
      SELECT id, nome, categoria, numero_serie, status, valor_diaria 
      FROM equipamentos 
      ORDER BY nome ASC
    `);
    
    res.json(rows); // Retorna el array de equipos directamente al frontend
  } catch (error) {
    console.error("Erro SQL no Inventário:", error);
    res.status(500).json({ error: "Erro ao listar inventário" });
  }
});
module.exports = router;
