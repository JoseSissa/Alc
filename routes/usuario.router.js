const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuario.controller');

router.get('/user', usuarioController.usuario);

// FUNCIONALIDADES DEL USUARIO
router.get('/newRegisterpqrs', usuarioController.nuevoPqrs);
router.post('/registerPQRS', usuarioController.registrarPQRS);
router.get('/verRegistros', usuarioController.verRegistros);

module.exports = router;