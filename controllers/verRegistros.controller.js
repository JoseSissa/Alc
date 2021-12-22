const connection = require('../database/connection');
const boom = require('@hapi/boom');

const verRegistros = {};

verRegistros.peticionRegistros = (req, res)=>{
    if(req.session.rol === 'ADMINISTRADOR'){
        connection.query('SELECT * FROM registerpqrs', (error, respuesta)=>{
            if(error) throw boom.badRequest('ERROR EL SOLICITAR LOS DATOS.');
            res.send(respuesta);
        });
    }else{
        connection.query('SELECT * FROM registerpqrs WHERE cc = ?', [req.session.cc], (error, respuesta)=>{
            if(error) throw boom.badRequest('ERROR EL SOLICITAR LOS DATOS.');
            res.send(respuesta);
        });
    };
};

module.exports = verRegistros;