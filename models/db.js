const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000, // Ajuste opcional de timeout de conexión (10 segundos)
  ssl: process.env.DB_CA_CERT ? { ca: process.env.DB_CA_CERT } : null, // Conexión SSL opcional
});

// Validar conexión
pool.getConnection()
  .then(connection => {
    //console.log('Connection established successfully');
    connection.release(); // Liberar conexión si se obtiene correctamente
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

module.exports = pool;
