const mysql = require('mysql2/promise');

// Configuración de la conexión a la base de datos
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'cuponred',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Función para probar la conexión
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Conexión a la base de datos establecida correctamente');
    connection.release();
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
}

module.exports = {
  pool,
  testConnection
}; 