//Se invoca express
const express =  require('express');
const app = express();
const path = require('path');

//Se setea urlencoded para capturar los datos del formulario (para evitar errores).
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Se invoca a dotenv
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'})

//Se setea el directorio 
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

//Se establece el motor de plantillas
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/src'));

//Invocamos al módulo de hashing para el password
// const bcryptjs = require('bcryptjs');

//Configuramos las variables de sesión
let session =  require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
// const connection = require('./database/connection');


app.use(require('./routes/login.router'));
app.use(require('./routes/index.router'));
app.use(require('./routes/register.router'));
app.use(require('./routes/logout.router'));



// //Establecemos la registración de los datos

// app.post('/register', async (req, res)=>{
    
//     const cc = req.body.cc;
//     const apellido1 = req.body.apellido1.toUpperCase();
//     const apellido2 = req.body.apellido2.toUpperCase();
//     const nombres = req.body.nombres.toUpperCase();
//     const rol = req.body.rol.toUpperCase();
//     const dependencia = req.body.dependencia.toUpperCase();
//     const pass = req.body.pass;

//     let passHash = await bcryptjs.hash(pass, 8);
    
//     connection.query('INSERT INTO users SET ?', {cc:cc, apellido1:apellido1, apellido2:apellido2, nombres:nombres, rol:rol, dependencia:dependencia, pass:passHash}, async (error, results)=>{
//         if (error) console.log('El error de la sentencia es: '+error)
//         else res.render('register', { alert: true })
//     })
// })





// app.get('/newRegisterpqrs', (req, res)=>{
//     if(req.session.loggedin == true){
//         const autenticar = {
//             login: true,
//             name: req.session.name,
//             rol: req.session.tipoUser
//         };
//         res.render('newRegisterpqrs', {autenticar})
//     }else{
//         const autenticar = {
//             icon: 'error',
//             title: 'Error',
//             text: 'No puedes acceder a esta dirección si no has iniciado sesión.',
//             scButton: false,
//             timer: 2000,
//             ruta: 'login'
//         };
//         res.render('/login', {o: JSON.stringify(autenticar)});
//     }
// });

// app.post("/registerPQRS", async (req, res)=>{
    

// });

// app.get('/verRegistros', (req, res)=>{
//     if(req.session.loggedin == true){
//         const autenticar = {
//             login: true,
//             name: req.session.name,
//             rol: req.session.tipoUser
//         };

//         connection.query('SELECT * FROM registerpqrs', (error, datosRegistro)=>{
//             if(error){
//                 throw error;
//             }else{
//                 module.exports = datosRegistro;
//             }
//         });



//         res.render('verRegistros', {autenticar})
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
//     }
// });



// app.get('/indexUser', (req, res)=>{
//     res.redirect('/');
// })
// app.get('/inicioAdmin', (req, res)=>{
//     res.redirect('/');
// })

// app.get('/newRegisterpqrs', (req, res)=>{
//     res.render('newRegisterpqrs');
// });


// Estableciendo el puerto de escucha
app.listen(3000, (req, res)=>{
    console.log('El servidor está ejecutandose');
});


// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------


