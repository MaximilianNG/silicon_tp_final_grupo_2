const express = require('express');
const router = express();
const jwt= require('jsonwebtoken');
const mysqlConnection = require('../database');
const verificarToken = require('./jwt');

///////////////  C.R.U.D. de Torneos  ///////////////

//CREATE de un torneo nuevo.
router.post('/torneos', (req, res) => {
    const { nombre, fecha, id_juego, id_localidad, id_primerPuesto, id_segundoPuesto, id_tercerPuesto } = req.body;
    let query = `INSERT INTO torneos (nombre, fecha, id_juego, id_localidad, id_primerPuesto, id_segundoPuesto, id_tercerPuesto) 
    VALUES ('${nombre}', '${fecha}', '${id_juego}', '${id_localidad}', '${id_primerPuesto}', '${id_segundoPuesto}', '${id_tercerPuesto}')`;

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
router.get('/torneos', verificarToken, (req, res)=>{
    jwt.verify(req.token, 'silicon', (error, valido) => {
        if (error) {
            res.json({
                status: false,
                mensaje: "Problema con sus credenciales, inicie sesión nuevamente."
            })
        } else {
            let query = `SELECT t.id, t.nombre, t.fecha, j.nombre AS juego, l.nombre AS localidad, t.estado, id_primerPuesto, id_segundoPuesto, id_tercerPuesto FROM torneos AS t
            INNER JOIN juegos AS j ON t.id_juego = j.id
            INNER JOIN localidades AS l ON t.id_localidad = l.id`;
            mysqlConnection.query(query, (err, rows)=>{
            res.json(rows);
        })
        }
    })
});

//UPDATE de un juego nuevo.
router.put('/torneos/:id', (req, res) => {
    let id = req.params.id;
    const { nombre, fecha, id_juego, id_localidad, id_primerPuesto, id_segundoPuesto, id_tercerPuesto } = req.body;
    let query = `UPDATE torneos SET nombre = '${nombre}', fecha = '${fecha}', id_juego = '${id_juego}', id_localidad = '${id_localidad}',
     id_primerPuesto = '${id_primerPuesto}', id_segundoPuesto = '${id_segundoPuesto}', 
     id_tercerPuesto = '${id_tercerPuesto}' WHERE id = ${id};`;

    mysqlConnection.query(query, (err, rows) => {
        if (!err) {
            res.json({
                status: true,
                mensaje: "El torneo se editó correctamente."
            });
        } else {
            res.json({
                status: false,
                mensaje: "Hubo un error editando el torneo. Ver torneosRouter.js."
            });
        }
    })
})

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