const express = require('express');
const router = express.Router();

const registerController = require('../controllers/register.controller');

router.get('/newRegisterpqrs', registerController.nuevoPqrs);

router.get('/verRegistros', registerController.verRegistros);

module.exports = router;