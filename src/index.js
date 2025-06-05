const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { testConnection } = require('./config/database');
const usuarioRoutes = require('./routes/usuarioRoutes');
const comercioRoutes = require('./routes/comercioRoutes');
const cuponRoutes = require('./routes/cuponRoutes');
const cuponAsignadoRoutes = require('./routes/cuponAsignadoRoutes');
const reportesRoutes = require('./routes/reportesRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const adminRoutes = require('./routes/adminRoutes');
const notificacionRoutes = require('./routes/notificacionRoutes');

// Configuración de variables de entorno
dotenv.config();

// Inicialización de la aplicación
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/comercios', comercioRoutes);
app.use('/api/cupones', cuponRoutes);
app.use('/api/cupones-asignados', cuponAsignadoRoutes);
app.use('/api/reportes', reportesRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notificaciones', notificacionRoutes);

// Ruta básica
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API de CupónRed' });
});

// Puerto del servidor
const PORT = process.env.PORT || 3000;

// Probar conexión a la base de datos
testConnection();

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
}); 