const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index.controller');

router.get('/user', indexController.usuario);

router.get('/admin', indexController.administrador);

module.exports = router;