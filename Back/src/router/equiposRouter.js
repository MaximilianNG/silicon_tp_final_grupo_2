const express = require('express');
const router = express();
const jwt= require('jsonwebtoken');
const verificarToken = require('./jwt');
const mysqlConnection = require('../database');

///////////////  C.R.U.D. de Juegos  ///////////////

//CREATE de un equipo nuevo.
router.post('/equipos', (req, res) => {
    const { nombre, id_juego } = req.body;
    let query = `INSERT INTO equipos (nombre, id_juego) VALUES ('${nombre}', '${id_juego}')`;

    mysqlConnection.query(query, (err, rows) => {
        if (!err) {
            res.json({
                status: true,
                mensaje: "El equipo se creó correctamente."
            });
        } else {
            res.json({
                status: false,
                mensaje: "Hubo un error creando el equipo. Ver equiposRouter.js."
            });
        }
    })
})

//READ (GET) de todos los equipos.
router.get('/equipos', verificarToken, (req, res) => {
    jwt.verify(req.token, 'silicon', (error, valido) => {
        if (error) {
            res.json({
                status: false,
                mensaje: "Problema con sus credenciales, inicie sesión nuevamente."
            })
        } else {
            let query = `SELECT e.id, e.nombre, e.estado, j.nombre AS juego FROM equipos AS e
                        INNER JOIN juegos AS j
                        ON e.id_juego = j.id;`
            mysqlConnection.query(query, (err, rows)=>{
                res.json(rows);
            })
        }
    })
});

//UPDATE de un equipo.
router.put('/equipos/:id', (req, res) => {
    let id = req.params.id;
    const { nombre, id_juego } = req.body;
    if (id_juego == "0") {
        query = `UPDATE equipos SET nombre = '${nombre}' WHERE id = ${id};`
    } else {
        query = `UPDATE equipos SET nombre = '${nombre}', id_juego = '${id_juego}' WHERE id = ${id};`
    }

    mysqlConnection.query(query, (err, rows) => {
        if (!err) {
            res.json({
                status: true,
                mensaje: "El equipo se editó correctamente."
            });
        } else {
            res.json({
                status: false,
                mensaje: "Hubo un error editando el equipo. Ver equiposRouter.js."
            });
        }
    })
})

//DELETE lógico de un equipo.
router.put('/estadoequipos/:id', (req, res)=>{
    let id = req.params.id;
    let estado = req.body.estado;
    let query = `UPDATE equipos SET estado=${estado} WHERE id=${id}`;

    mysqlConnection.query(query, (err, rows)=>{
        if (!err) {
            res.json({
                status: true,
                mensaje: "El estado del equipo se cambió correctamente."
            });
        } else {
            res.json({
                status: false,
                mensaje: "Hubo un error cambiando el estado del equipo."
            });
        }
    })
});

//Siempre terminar exportando para que index.js pueda tener acceso a estas rutas.
module.exports = router;