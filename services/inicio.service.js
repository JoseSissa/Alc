const express = require('express');
const connection1 = require('../database/connection');
const bcryptjs = require('bcryptjs');

let session =  require('express-session');
const app = express();
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

const inicioService = {};


inicioService.iniciar = (req, res)=>{
    res.render('login');
};
inicioService.login = async (user, pass, req, res)=>{
    console.log(`ACABAN DE INGRESAR LOS DATOS Y SON ${user} ${pass}`);
    if (user && pass){
        console.log('hay usuario y contraseña');
        connection1.query("SELECT * FROM users WHERE cc = ?", [user], async(error, results)=>{
            console.log('Hay conexión a la db');
            if (results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass))){
                const sweetAlert = {
                    control: false,
                    icon: 'error',
                    title: 'Error',
                    text: 'Error en la conexión a la bd',
                    scButton: true,
                    timer: false,
                    ruta: '' 
                };
                console.log(`VARIABLES DE SWEET ALERT ${sweetAlert}`);
                return new Promise((resolve, reject)=>{
                    console.log('PROBANDO EL LOGIN, USER Y PASS INCORRECTOS');                  
                    resolve(sweetAlert);
                });
            }else{
                console.log('USER AND PASS CORRECTOS');
                const rol = results[0].rol;
                const sweetAlert = {
                    control: true,
                    icon: 'success',
                    title: 'Conexión exitosa',
                    text: '¡LOGIN CORRECTO!',
                    scButton: false,
                    timer: 1500,
                    ruta: ''
                };
                if (rol === 'ADMINISTRADOR') sweetAlert.ruta = 'indexAdmin'
                else sweetAlert.ruta = 'indexUser';  
                res.render('login', {o: JSON.stringify(sweetAlert)});
                console.log('PROBANDO EL LOGIN, USER Y PASS CORRECTOS');    
                return new Promise((resolve, reject)=>{              
                    resolve(sweetAlert);
                });
            };
        });
    }else{
        throw boom.badRequest('SIN DATOS');
    }
};

module.exports = inicioService;