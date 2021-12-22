const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller');

router.get('/admin', adminController.administrador);

// FUNCIONALIDADES DEL ADMINISTRADOR
router.get('/nuevaSolicitud-A', adminController.nuevaSolicitud);
router.post('/registrarPQRSAdmin', adminController.registrarPQRSAdmin);
router.get('/verTodosRegistros', adminController.verTodosRegistros);
router.get('/nuevoUsuario', adminController.nuevoUsuario);
router.post('/nuevoUsuario', adminController.registrarNuevoUsuario);


module.exports = router;