const express = require('express');
const router = express();

/* // Librería para encriptar passwords.
const bcrypt= require('bcrypt');
// Librería para generar tokens.
const jwt= require('jsonwebtoken'); */

// Archivo de conexión a la base de datos.
const mysqlConnection = require('../database');

//READ (GET) de todos los jugadores.
router.get('/jugadores', (req, res)=>{
    let query = `SELECT j.id,j.nombre,j.apellido,j.nombre_profesional,j.email,l.nombre as localidad,e.nombre as equipo, j.estado FROM jugadores as j
    inner join localidades as l on j.id_localidad=l.id
    inner join equipos as e on j.id_equipo = e.id;`;

    mysqlConnection.query(query, (err, rows)=>{
        res.json(rows);
    })
});


//Siempre terminar exportando para que index.js pueda tener acceso a estas rutas.
module.exports = router;