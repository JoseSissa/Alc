//Se establece la conexión con la db:
const express = require('express');

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect((error)=>{
    if(error){
        console.log(`El error de conexión es: ${error}`);
        return;
    }
    console.log(`Conectado a la db con xampp`);
});

module.exports = connection; 