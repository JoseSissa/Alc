const express = require('express');
const router = express.Router();

router.get('/login', (req, res)=>{
    res.render('login');
});

module.exports = router;

// const inicioService = require('../services/inicio.service');

// router.get('/login', inicioService.iniciar());

// router.post('/login', async (req, res, next)=>{
//     console.log('ENTRÉ AL LOG DE ROUTER POST');
//     try {
//         const { user, pass } = req.body;
//         console.log(`USUARIO ${user} CONTRASEÑA ${pass}`);
//         const sweetAlert = await inicioService.login(user, pass);
//         console.log(`HE EJECUTADO LA FUNCION Y TENGO LOS DATOS ${sweetAlert}`);
//         res.render('login', );
//     } catch (error) {
//         next(error)
//         console.log('Error en el try catch del post');
//     };
// });
// module.exports = router;



// router.get('/', (req, res)=>{ 
//     if(req.session.loggedin == true){
//         const autenticar = {
//             login: true,
//             name: req.session.name,
//             rol: req.session.tipoUser
//         };
//         if(req.session.tipoUser == 'ADMINISTRADOR') res.render('indexAdmin', {autenticar})
//         else res.render('indexUser', {autenticar});
//     }else{
//         const autenticar = {
//             icon: 'error',
//             title: 'Error',
//             text: 'No puedes acceder a esta dirección si no has iniciado sesión.',
//             scButton: false,
//             timer: 2000,
//             ruta: 'login'
//         };
//         res.render('login', {o: JSON.stringify(autenticar)});
//     };
// });