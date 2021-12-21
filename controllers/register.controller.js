const connection = require('../database/connection');
const registerController = {};

const boom = require('@hapi/boom');

registerController.nuevoPqrs = (req, res)=>{
    if(req.session.rol === 'USUARIO' || req.session.rol === 'ADMINISTRADOR'){
        res.render('newRegisterpqrs', { name:req.session.name, user: req.session.rol })
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

registerController.registrarPQRS = (req, res)=>{
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
                ruta: 'user'
            }
            res.render('newRegisterpqrs', {o: JSON.stringify(sweetAlert)});
        };
    });
};

registerController.verRegistros = (req, res)=>{
    if(req.session.rol === 'USUARIO'){
        res.render('verRegistros', { name:req.session.name, user: req.session.rol })
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

registerController.obtenerRegistros = (req, res, next)=>{
    connection.query('SELECT * FROM registerpqrs WHERE cc = ?', [req.session.cc], (err, results)=>{
        if(err){
            throw boom.badData('Error request. ObtenerRegistros.');
        }else{
            res.send(results);
        }
    });
};

module.exports = registerController;