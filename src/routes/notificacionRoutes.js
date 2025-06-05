const express = require('express');
const router = express.Router();
const notificacionController = require('../controllers/notificacionController');
const auth = require('../middleware/auth');

// Simulación de notificaciones
router.post('/whatsapp', auth, notificacionController.enviarWhatsApp);
router.post('/email', auth, notificacionController.enviarEmail);

module.exports = router; 