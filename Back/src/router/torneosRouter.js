const express = require('express');
const router = express();

/* // Librería para encriptar passwords.
const bcrypt= require('bcrypt');
// Librería para generar tokens.
const jwt= require('jsonwebtoken'); */

// Archivo de conexión a la base de datos.
const mysqlConnection = require('../database');

///////////////  C.R.U.D. de Juegos  ///////////////

//CREATE de un torneo nuevo.
router.post('/torneos', (req, res) => {
    const { fecha, id_juego, id_localidad, id_primerPuesto, id_segundoPuesto, id_tercerPuesto } = req.body;
    let query = `INSERT INTO torneos (fecha, id_juego, id_localidad, id_primerPuesto, id_segundoPuesto, id_tercerPuesto) 
    VALUES ('${fecha}', '${id_juego}', '${id_localidad}', '${id_primerPuesto}', '${id_segundoPuesto}', '${id_tercerPuesto}')`;

    mysqlConnection.query(query, (err, rows) => {
        if (!err) {
            res.json({
                status: true,
                mensaje: "El torneo se creó correctamente."
            });
        } else {
            res.json({
                status: false,
                mensaje: "Hubo un error creando el torneo. Ver torneosRouter.js."
            });
        }
    })
})

//READ (GET) de todos los torneos.
router.get('/torneos', (req, res)=>{
    let query = `SELECT t.id, t.fecha, j.nombre AS juego, l.nombre AS localidad, t.estado FROM torneos AS t
                INNER JOIN juegos AS j ON t.id_juego = j.id
                INNER JOIN localidades AS l ON t.id_localidad = l.id`;

    mysqlConnection.query(query, (err, rows)=>{
        res.json(rows);
    })
});

//UPDATE de un juego nuevo.
/* router.put('/juegos/:id', (req, res) => {
    let id = req.params.id;
    const { nombre } = req.body;
    let query = `UPDATE juegos SET nombre='${nombre}' WHERE id=${id}`;

    mysqlConnection.query(query, (err, rows) => {
        if (!err) {
            res.json({
                status: true,
                mensaje: "El juego se editó correctamente."
            });
        } else {
            res.json({
                status: false,
                mensaje: "Hubo un error editando el juego. Ver juegosRouter.js."
            });
        }
    })
}) */

//DELETE lógico de un torneo.
router.put('/estadotorneos/:id', (req, res)=>{
    let id = req.params.id;
    let estado = req.body.estado;
    let query = `UPDATE torneos SET estado=${estado} WHERE id=${id}`;

    mysqlConnection.query(query, (err, rows)=>{
        if (!err) {
            res.json({
                status: true,
                mensaje: "El estado del torneo se cambió correctamente."
            });
        } else {
            res.json({
                status: false,
                mensaje: "Hubo un error cambiando el estado del torneo."
            });
        }
    })
});

//Siempre terminar exportando para que index.js pueda tener acceso a estas rutas.
module.exports = router;