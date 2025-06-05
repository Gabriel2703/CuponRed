const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const rol = require('../middleware/rol');

// Solo admin
router.put('/aprobar-comercio/:id', auth, rol(['admin']), adminController.aprobarComercio);
router.get('/usuarios', auth, rol(['admin']), adminController.getUsuarios);
router.get('/comercios', auth, rol(['admin']), adminController.getComercios);

module.exports = router; 