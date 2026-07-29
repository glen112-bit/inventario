
import bcrypt from 'bcryptjs'
import db from '../config/db.js'

export const getUsuarios = async ( req, res ) => {
  try {
    const [ rows ] = await db.query(
      'SELECT * FROM usuarios'
    )
    res.json(rows)
  } catch(error) {

    console.error(error)
    res.status(500).json({
      error: error.message 
    })
  }
}

export const createUsuario = async (req, res) => {
  try{
    const {
      nome,
      email,
      telefone,
      password, 
      rol,
      activo = true
    } = req.body
    const [existe] = await db.query(
      `
      SELECT id
      FROM usuarios
      WHERE email = ?
      `, [email])

    if(existe.length > 0 ) {
      return res.status(400).json({
        error: 'Ja existe Usuario com esse e-mail'
      })
    }

    const senhaHash = await bcrypt.hash(password, 10)

    const [result] = await db.query(
      `
        INSERT INTO usuarios (
        nome,
        email,
        telefone,
        password,
        rol,
        activo
        )
        VALUES (?, ?, ?, ?, ?, ?)
        `, [
          nome,
          email,
          telefone,
          senhaHash,
          rol,
          true 
        ])

    const [[usuario]] = await db.query(
      `
          SELECT
          id,
          nome,
          email,
          telefone,
          rol,
          activo
          FROM usuarios
          WHERE id = ?
          `, [result.insertId])
    res.status(201).json({
      succes: true,
      usuario
    })
  }catch (error) {
    console.error(error)
    res.status(500).json({
      error: error.message
    })
  }
}

export const updateUsuario = async (req, res) => {
  console.log("=================================");
  console.log("METHOD:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("HEADERS:", req.headers["content-type"]);
  console.log("BODY:", req.body);
  if (!req.body) {
    return res.status(400).json({
      error: "Request sem body"
    });
  }
  try {

    const { id } = req.params


    const {
      nome,
      email,
      telefone,
      rol,
      activo,
      // senhaAtual
    } = req.body
console.log('BODY COMPLETO:')
console.log(req.body)

console.log({
  nome,
  email,
  telefone,
  rol,
  activo,
  id
})
   const [result] = await db.query(`
  UPDATE usuarios
  SET
    nome = ?,
    email = ?,
    telefone = ?,
    rol = ?,
    activo = ?
  WHERE id = ?
`, [
  nome,
  email,
  telefone,
  rol,
  activo,
  id
])

console.log(result)
console.log("UPDATE OK");
    const [[usuario]] = await db.query(
      `
      SELECT
      id,
      nome,
      email,
      telefone,
      rol,
      activo
      FROM usuarios
      WHERE id = ?
      `,
      [id]
    )
    console.log(usuario)
    res.json({
      success: true,
      usuario
    })
 } catch (error) {

  console.error('========== ERROR UPDATE USUARIO ==========')
  console.error(error)
  console.error(error.stack)

  res.status(500).json({
    error: error.message
  })

}
}
    // Buscar la contraseña actual del usuario
    // const adminId = req.user.id
//
    // const [rows] = await db.query(`
  // SELECT password
  // FROM usuarios
  // WHERE id = ?
// `, [adminId])
//
    // console.log(rows)
    // console.log(senhaAtual)
//
    // const senhaCorreta = await bcrypt.compare(
      // senhaAtual,
      // rows[0].password
    // )
//
    // if (!senhaCorreta) {
//
      // return res.status(401).json({
        // message: "Senha incorreta"
      // })
//
    // }
    // await db.query(
      // `
      // UPDATE usuarios
      // SET
      // nome=?,
      // email=?,
      // telefone=?,
      // rol=?,
      // activo=?
      // WHERE id=?
      // `,[
        // nome,
        // email,
        // telefone,
        // rol,
        // activo,
        // id
      // ])
//
    // const [[usuario]] = await db.query(
      // `
        // SELECT
        // id,
        // nome,
        // email,
        // telefone,
        // rol,
        // activo
        // FROM usuarios
        // WHERE id = ?
        // `, [id])
//
    // res.json({
      // success: true,
      // usuario
    // })
//
  // } catch (error) {
//
    // console.error(error)
//
    // res.status(500).json({
      // error: error.message
    // })
//
  // }

// }


export const alterarStatus = async (req, res) => {

  try {

    const { id } = req.params

    const { activo } = req.body

    await db.query(`
      UPDATE usuarios
      SET activo = ?
      WHERE id = ?
    `, [
      activo,
      id
    ])

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
export const alterarSenha = async(req,res)=>{

  try{

    const { id } = req.params

    const { password } = req.body

    const hash = await bcrypt.hash(password,10)

    await db.query(`
            UPDATE usuarios
            SET password = ?
            WHERE id = ?
        `,[hash,id])

    res.json({
      success:true
    })

  }catch(error){

    console.error(error)

    res.status(500).json({
      error:error.message
    })

  }

}
export const deleteUsuario = async (req,res) => {

  try {

    const { id } = req.params

    await db.query(
      'DELETE FROM usuarios WHERE id = ?',
      [id]
    )

    res.json({
      success: true
    })

  } catch(error) {

    console.error(error)

    res.status(500).json({
      error: error.message
    })

  }

}
export const getUsuarioById = async (req,res)=>{

  try{

    const { id } = req.params

    const [[usuario]] = await db.query(`
      SELECT
        id,
        nome,
        email,
        telefone,
        rol,
        activo,
        created_at
      FROM usuarios
      WHERE id = ?
    `,[id])

    if(!usuario){

      return res.status(404).json({
        error:'Usuário não encontrado'
      })

    }

    res.json(usuario)

  }catch(error){

    console.error(error)

    res.status(500).json({
      error:error.message
    })

  }

}
