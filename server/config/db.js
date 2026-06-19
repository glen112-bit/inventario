// config/db.js

import  mysql from 'mysql2/promise';
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // waitForConnections: true,
  // connectionLimit: 10
});
try {
  const conn = await pool.getConnection()
  console.log('✅ MySQL conectado')
  conn.release()
} catch (err) {
  console.error('❌ Error MySQL')
  console.error(err)
}
export default pool;
