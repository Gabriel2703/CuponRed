const express = require('express');
const router = express.Router();
const cuponAsignadoController = require('../controllers/cuponAsignadoController');
const auth = require('../middleware/auth');

// Asignar cupón a usuario
router.post('/asignar', auth, cuponAsignadoController.asignarCupon);
// Canjear cupón
router.post('/canjear', auth, cuponAsignadoController.canjearCupon);
// Historial de cupones de un usuario
router.get('/usuario/:id_usuario', auth, cuponAsignadoController.historialCuponesUsuario);

module.exports = router; 