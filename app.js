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


//Configuramos las variables de sesión
let session =  require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.get('/', (req, res)=>{res.render('login')});

app.use(require('./routes/login.router'));
app.use(require('./routes/admin.router'));
app.use(require('./routes/usuario.router'));
app.use(require('./routes/logout.router'));
app.use(require('./routes/verRegistros.router'));


app.listen(3000, (req, res)=>{
    console.log('El servidor está ejecutandose');
});