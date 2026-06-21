import db from '../config/db.js'
import bcrypt from 'bcryptjs'

try {

  const [usuarios] = await db.query(
    'SELECT id, password FROM usuarios'
  )

  for (const usuario of usuarios) {

    const hash = await bcrypt.hash(
      usuario.password,
      10
    )

    await db.query(`
      UPDATE usuarios
      SET password = ?
      WHERE id = ?
    `, [
      hash,
      usuario.id
    ])

    console.log(
      `Usuario ${usuario.id} actualizado`
    )
  }

  console.log('Usuarios migrados')

} catch(error) {

  console.error(error)

} finally {

  process.exit()

}
