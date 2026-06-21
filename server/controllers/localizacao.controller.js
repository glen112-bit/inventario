export const createLocalizacao =
  async (req,res) => {

  try {

    const {
      localizacao
    } = req.body

    const [result] =
      await db.query(`
        INSERT INTO localizacoes (
          localizacao
        )
        VALUES (?)
      `, [
        localizacao
      ])

    res.status(201).json({
      success:true,
      id: result.insertId
    })

  } catch(error){

    console.error(error)

    res.status(500).json({
      error:error.message
    })

  }

}
