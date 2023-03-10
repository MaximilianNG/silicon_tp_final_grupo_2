const verificarToken = require('./jwt');
const express = require('express');
const router = express();
const jwt = require('jsonwebtoken');
const mysqlConnection = require('../database');

///////////////  C.R.U.D. de Juegos  ///////////////

//CREATE de un juego nuevo.
router.post('/juegos', (req, res) => {
        const { nombre } = req.body;
        let query = `INSERT INTO juegos (nombre) VALUES ('${nombre}')`;
    
        mysqlConnection.query(query, (err, rows) => {
            if (!err) {
                res.json({
                    status: true,
                    mensaje: "El juego se creó correctamente."
                });
            } else {
                res.json({
                    status: false,
                    mensaje: "Hubo un error creando el juego. Ver juegosRouter.js."
                });
            }
        })
        }
)

//READ (GET) de todos los juegos.
router.get('/juegos', verificarToken, (req, res)=>{
    jwt.verify(req.token, 'silicon', (error, valido) => {
        if (error) {
            res.json({
                status: false,
                mensaje: "Problema con sus credenciales, inicie sesión nuevamente."
            })
        } else {
            mysqlConnection.query('SELECT * from juegos', (err, rows)=>{
                res.json(rows);
            })
        }
    })
});

//UPDATE de un juego nuevo.
router.put('/juegos/:id', (req, res) => {
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
})

//DELETE lógico de un juego.
router.put('/estadojuegos/:id', (req, res)=>{
    let id = req.params.id;
    let estado = req.body.estado;
    let query = `UPDATE juegos SET estado=${estado} WHERE id=${id}`;

    mysqlConnection.query(query, (err, rows)=>{
        if (!err) {
            res.json({
                status: true,
                mensaje: "El estado del juego se cambió correctamente."
            });
        } else {
            res.json({
                status: false,
                mensaje: "Hubo un error cambiando el estado del juego."
            });
        }
    })
});

//Siempre terminar exportando para que index.js pueda tener acceso a estas rutas.
module.exports = router;