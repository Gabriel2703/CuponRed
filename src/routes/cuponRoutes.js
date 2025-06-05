const express = require('express');
const router = express.Router();
const cuponController = require('../controllers/cuponController');
const auth = require('../middleware/auth');

// CRUD de cupones (protegido)
router.get('/', auth, cuponController.getCupones);
router.get('/:id', auth, cuponController.getCuponById);
router.post('/', auth, cuponController.createCupon);
router.put('/:id', auth, cuponController.updateCupon);
router.delete('/:id', auth, cuponController.deleteCupon);

module.exports = router; 