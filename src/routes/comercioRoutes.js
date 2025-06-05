const express = require('express');
const router = express.Router();
const comercioController = require('../controllers/comercioController');
const auth = require('../middleware/auth');

// Registro y login
router.post('/register', comercioController.registerComercio);
router.post('/login', comercioController.loginComercio);

// CRUD (protegido, solo admin)
router.get('/', auth, comercioController.getComercios);
router.put('/:id/activo', auth, comercioController.setActivo);
router.delete('/:id', auth, comercioController.deleteComercio);

module.exports = router; 