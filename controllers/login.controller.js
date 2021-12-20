const bcrypt = require('bcryptjs');
const { json } = require('express/lib/response');
const connection = require('../database/connection');

const loginController = {};

loginController.inicio = (req, res)=>{
    res.render('login');
};

loginController.iniciarSesion = async (req, res) =>{
    const { user, pass } = req.body;
    if(user && pass){
        connection.query("SELECT * FROM users WHERE cc = ?", user, async (error, results)=>{
            if(results.length === 0 || !(await bcrypt.compare(pass, results[0].pass))){
                const sweetAlert = {
                    control: true,
                    title: 'Error',
                    text: 'Credenciales incorrectas',
                    icon: 'error',
                    scButton: true,
                    timer: false,
                    ruta: 'login' 
                };
                res.render('login', {o: JSON.stringify(sweetAlert)});
            }else{
                req.session.name = results[0].nombres;
                req.session.rol = results[0].rol;
                req.session.cc = results[0].cc;
                const sweetAlert = {
                    control: true,
                    icon: 'success',
                    title: 'Conexión exitosa',
                    text: '¡LOGIN CORRECTO!',
                    scButton: false,
                    timer: 1500,
                    ruta: ''
                };
                if (req.session.rol === 'ADMINISTRADOR') sweetAlert.ruta = 'admin'
                else sweetAlert.ruta = 'user';  
                res.render('login', {o: JSON.stringify(sweetAlert)});                
            };
        });
    };       
};

module.exports = loginController;