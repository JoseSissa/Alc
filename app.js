//Se invoca express
const express =  require('express');
const app = express();

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
app.set('view engine', 'pug');

//Invocamos al módulo de hashing para el password
const bcryptjs = require('bcryptjs');

//Configuramos las variables de sesión
const session =  require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

//Se invoca el módulo de conexión de la db.
const connection = require('./database/connection');

//Establecemos las rutas



app.get('/', (req, res)=>{
    res.render('index');
});

app.listen(3000, (req, res)=>{
    console.log('El servidor está ejecutandose');
});