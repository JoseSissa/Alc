const connection = require('../database/connection');
const bcryptjs = require('bcryptjs');
const adminController = {};

adminController.administrador = (req, res)=>{
    if (req.session.rol === 'ADMINISTRADOR' ){
        res.render('admin', { name:req.session.name, user: req.session.rol })
    }else{
        const sweetAlert = {
            control: true,
            title: 'Error',
            text: 'Debes iniciar sesión para usar cualquier funcionalidad.',
            icon: 'error',
            scButton: false,
            timer: 2000,
            ruta: 'login' 
        };
        res.render('login', {o: JSON.stringify(sweetAlert)});
    };
};

adminController.nuevaSolicitud = (req, res)=>{
    if(req.session.rol === 'ADMINISTRADOR'){
        res.render('nuevaSolicitud-A', { name:req.session.name, user: req.session.rol })
    }else{
        const sweetAlert = {
            control: true,
            title: 'Error',
            text: 'Debes iniciar sesión para usar cualquier funcionalidad.',
            icon: 'error',
            scButton: false,
            timer: 2000,
            ruta: 'login' 
        };
        res.render('login', {o: JSON.stringify(sweetAlert)});
    };
};

adminController.registrarPQRSAdmin = (req, res)=>{
    const peticion = req.body.requestType.toUpperCase();
    const entidad = req.body.entidad.toUpperCase();
    const emailForm = req.body.emailForm.toUpperCase();
    const numberTel = req.body.numberTel;
    const asunto = req.body.textAsunto.toUpperCase();

    connection.query('INSERT INTO registerpqrs SET ?', {id:null, cc: req.session.cc, peticion:peticion, entidad:entidad, email:emailForm, numeroTel:numberTel, asunto:asunto}, async (error, results)=>{
        if(error) {
            console.log('Error al registrar el PQRS, el error es: '+error)
        }else{
            const sweetAlert = {
                icon: 'success',
                title: 'Perfecto',
                text: 'Su solicitud se ha guardado satisfactoriamente.',
                scButton: false,
                timer: 1500,
                ruta: 'admin'
            }
            res.render('nuevaSolicitud-A', {o: JSON.stringify(sweetAlert)});
        };
    });
};

adminController.verTodosRegistros = (req, res)=>{
    if(req.session.rol === 'ADMINISTRADOR'){
        res.render('vertodosRegistros', { name:req.session.name, user: req.session.rol })
    }else{
        const sweetAlert = {
            control: true,
            title: 'Error',
            text: 'Debes iniciar sesión para usar cualquier funcionalidad.',
            icon: 'error',
            scButton: false,
            timer: 2000,
            ruta: 'login' 
        };
        res.render('login', {o: JSON.stringify(sweetAlert)});
    };
};

adminController.nuevoUsuario = (req, res)=>{
    if(req.session.rol === 'ADMINISTRADOR'){
        res.render('nuevoUsuario', { name:req.session.name, user: req.session.rol })
    }else{
        const sweetAlert = {
            control: true,
            title: 'Error',
            text: 'Debes iniciar sesión para usar cualquier funcionalidad.',
            icon: 'error',
            scButton: false,
            timer: 2000,
            ruta: 'login' 
        };
        res.render('login', {o: JSON.stringify(sweetAlert)});
    };
};

adminController.registrarNuevoUsuario = async (req, res)=>{    
        const cc = req.body.cc;
        const apellido1 = req.body.apellido1.toUpperCase();
        const apellido2 = req.body.apellido2.toUpperCase();
        const nombres = req.body.nombres.toUpperCase();
        const rol = req.body.rol.toUpperCase();
        const dependencia = req.body.dependencia.toUpperCase();
        const pass = req.body.pass;
    
        let passHash = await bcryptjs.hash(pass, 8);
        
        connection.query('INSERT INTO users SET ?', {cc:cc, apellido1:apellido1, apellido2:apellido2, nombres:nombres, rol:rol, dependencia:dependencia, pass:passHash}, async (error, results)=>{
            if (error) console.log('El error de la sentencia es: '+error)
            else res.render('nuevoUsuario', { alert: true })
        });
    };

module.exports = adminController;