const express = require('express');
const router = express.Router();
const reportesController = require('../controllers/reportesController');
const auth = require('../middleware/auth');

// Reportes de cupones y estadísticas
router.get('/cupones-usados', auth, reportesController.cuponesUsados);
router.get('/cupones-disponibles', auth, reportesController.cuponesDisponibles);
router.get('/cupones-asignados', auth, reportesController.cuponesAsignados);
router.get('/estadisticas', auth, reportesController.estadisticasGenerales);
router.get('/ranking-entregados', auth, reportesController.rankingComerciosEntregados);
router.get('/ranking-canjeados', auth, reportesController.rankingComerciosCanjeados);
router.get('/cupones-entregados-mes', auth, reportesController.cuponesEntregadosPorMes);
router.get('/cupones-canjeados-mes', auth, reportesController.cuponesCanjeadosPorMes);
router.get('/comercio-mas-interaccion', auth, reportesController.comercioMasInteraccion);

module.exports = router; 