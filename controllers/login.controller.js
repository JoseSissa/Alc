const bcrypt = require('bcryptjs');
const connection = require('../database/connection');

const loginController = {};

loginController.inicio = (req, res)=>{
    res.render('login');
};

loginController.iniciarSesion = async (req, res) =>{
    const { user, pass } = req.body;
    if(user && pass){
        console.log(user+pass);
        connection.query("SELECT * FROM users WHERE cc = ?", user, async (error, results)=>{
            if(results.length === 0 || !(await bcrypt.compare(pass, results[0].pass))){
                const sweetAlert = {
                    title: 'Error',
                    text: 'Credenciales incorrectas',
                    icon: 'error',
                    scButton: true,
                    timer: false,
                    ruta: '/login' 
                };
                res.render('login', {o: JSON.stringify(sweetAlert)});
            }else{

                console.log('USER AND PASS CORRECTOS');
                req.session.rol = results[0].rol;
                console.log(req.session.rol);
                const sweetAlert = {
                    control: true,
                    icon: 'success',
                    title: 'Conexión exitosa',
                    text: '¡LOGIN CORRECTO!',
                    scButton: false,
                    timer: 1500,
                    ruta: ''
                };
                if (req.session.rol === 'ADMINISTRADOR') sweetAlert.ruta = 'indexAdmin'
                else sweetAlert.ruta = 'indexUser';  
                res.render('login', {o: JSON.stringify(sweetAlert)});
                
            };
        });
    };       
};

module.exports = loginController;
    //     connection.query("SELECT * FROM users WHERE cc = ?", [user], (error, results)=>{
    //         if (results.length == 0 || await bcryptjs.compare(pass, results[0].pass)){

    //         }else{

    //         }
    //     }
    // }

// inicioService.login = async (user, pass, req, res)=>{
//     console.log(`ACABAN DE INGRESAR LOS DATOS Y SON ${user} ${pass}`);
//     if (user && pass){
//         console.log('hay usuario y contraseña');
//         connection1.query("SELECT * FROM users WHERE cc = ?", [user], async(error, results)=>{
//             console.log('Hay conexión a la db');
//             if (results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass))){
//                 
//                 console.log(`VARIABLES DE SWEET ALERT ${sweetAlert}`);
//                 return new Promise((resolve, reject)=>{
//                     console.log('PROBANDO EL LOGIN, USER Y PASS INCORRECTOS');                  
//                     resolve(sweetAlert);
//                 });
//             }else{
//                 
//         });
//     }
// };
