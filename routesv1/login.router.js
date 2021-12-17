const express = require('express');
const router = express.Router();

const loginService = require('../services/login.service');

router.get('/login', (req, res)=>{
    res.send('RUTA LOGIN GET');
});

router.post('/login', async (req, res)=>{
    console.log('ENTRÉ AL LOG DE ROUTER POST');
    try {
        const { user, pass } = req.body;
        const sweetAlert = await loginService.login(user, pass);
        res.render('login', {o: JSON.stringify(sweetAlert)});
    } catch (error) {
        console.log('Error en el try catch del post');
    };
});

module.exports = router;