const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index.controller');

router.get('/indexUser', indexController.usuario);

router.get('/indexAdmin', indexController.administrador);

module.exports = router;