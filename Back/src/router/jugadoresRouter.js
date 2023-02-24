const express = require('express');
const router = express();

/* // Librería para encriptar passwords.
const bcrypt= require('bcrypt');
// Librería para generar tokens.
const jwt= require('jsonwebtoken'); */

// Archivo de conexión a la base de datos.
const mysqlConnection = require('../database');

//GET de todos los Jugadores.
router.get('/jugadores', (req, res)=>{
    mysqlConnection.query('SELECT * from jugadores', (err, rows)=>{
        res.json(rows);
    })
});

module.exports = router;