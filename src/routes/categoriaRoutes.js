const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const auth = require('../middleware/auth');

// CRUD de categorías (GET público)
router.get('/', categoriaController.getCategorias);
router.post('/', auth, categoriaController.createCategoria);
router.put('/:id', auth, categoriaController.updateCategoria);
router.delete('/:id', auth, categoriaController.deleteCategoria);

// Preferencias de usuario
router.get('/preferencias/:id_usuario', auth, categoriaController.getPreferenciasUsuario);
router.post('/preferencias', auth, categoriaController.addPreferenciaUsuario);
router.delete('/preferencias', auth, categoriaController.deletePreferenciaUsuario);

module.exports = router; 