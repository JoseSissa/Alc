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
const bcryptjs = require('bcryptjs');

//Configuramos las variables de sesión
let session =  require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

//Se invoca el módulo de conexión de la db.
const connection = require('./database/connection');



//Establecemos las rutas
app.get('/', (req, res)=>{
    res.render('login')
});
app.get('/login', (req, res)=>{
    res.render('login');
});
app.get('/register', (req, res)=>{
    res.render('register');
});



//Establecemos la registración de los datos

app.post('/register', async (req, res)=>{
    const user = req.body.user;
    const names = req.body.names;
    const rol = req.body.rol;
    const pass = req.body.pass;
    let passHash = await bcryptjs.hash(pass, 8);
    connection.query('INSERT INTO users SET ?', {user:user, name:names, rol:rol, pass:passHash}, async (error, results)=>{
        if (error) console.log('El error de la sentencia es: '+error)
        else res.render('register', { alert: true })
    })
})


// Autenticación de los usuarios
app.post('/auth', async (req, res)=>{
    const user = req.body.user;
    const pass = req.body.pass;
    let passwordHash = await bcryptjs.hash(pass, 8);

    if (user && pass){
        connection.query("SELECT * FROM users WHERE user = ?", [user], async(error, results)=>{
            if (results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass))){
                // res.send('USUARIO Y/O CONTRASEÑA INCORRECTAS.')
                const sweetAlert = {
                    control: true,
                    icon: 'error',
                    title: 'Error',
                    text: 'Error en la conexión a la bd'
                }
                module.exports = sweetAlert;
                res.render('prueba')


            }else{
                // req.session.loggedin = true;
                // req.session.name = results[0].name;
                // res.render('prueba', {alerta: true});
                res.send('LOGIN CORRECTO');
            }
        })
    }
});


// Estableciendo el puerto de escucha
app.listen(3000, (req, res)=>{
    console.log('El servidor está ejecutandose');
});