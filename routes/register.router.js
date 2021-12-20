const express = require('express');
const router = express.Router();

const registerController = require('../controllers/register.controller');

router.get('/newRegisterpqrs', registerController.nuevoPqrs);
router.post('/registerPQRS', registerController.registrarPQRS)

router.get('/verRegistros', registerController.verRegistros);
router.get('/prueba', registerController.obtenerRegistros);

module.exports = router;