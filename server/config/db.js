// config/db.js

import  mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'equipamentos',
  waitForConnections: true,
  connectionLimit: 10
});

export default pool;
