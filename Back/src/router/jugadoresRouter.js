const express = require('express');
const router = express();
const jwt= require('jsonwebtoken');
const verificarToken = require('./jwt');
const mysqlConnection = require('../database');

//READ (GET) de todos los jugadores.
router.get('/jugadores', verificarToken, (req, res) => {
    jwt.verify(req.token, 'silicon', (error, valido) => {
        if (error) {
            res.json({
                status: false,
                mensaje: "Problema con sus credenciales, inicie sesión nuevamente."
            })
        } else {
            let query = `SELECT j.id,j.nombre,j.apellido,j.nombre_profesional,j.email,l.nombre as localidad,e.nombre as equipo, j.estado FROM jugadores as j
            inner join localidades as l on j.id_localidad=l.id
            inner join equipos as e on j.id_equipo = e.id;`;
        
            mysqlConnection.query(query, (err, rows)=>{
                res.json(rows);
            })
        }
    })

});

//CREATE de un jugador nuevo.
router.post('/jugadores', (req, res) => {
    const { nombre, apellido, nombre_profesional, email, id_localidad, id_equipo} = req.body;
    let query = `INSERT INTO jugadores (nombre, apellido, nombre_profesional, email, id_localidad, id_equipo) 
    VALUES ('${nombre}', '${apellido}', '${nombre_profesional}', '${email}', '${id_localidad}', '${id_equipo}')`;

    mysqlConnection.query(query, (err, rows) => {
        if (!err) {
            res.json({
                status: true,
                mensaje: "El jugador se creó correctamente."
            });
        } else {
            res.json({
                status: false,
                mensaje: "Hubo un error creando el jugador. Ver jugadoresRouter.js."
            });
        }
    })
})


//DELETE lógico de un jugador.
router.put('/estadojugador/:id', (req, res)=>{
    let id = req.params.id;
    let estado = req.body.estado;
    let query = `UPDATE jugadores SET estado=${estado} WHERE id=${id}`;

    mysqlConnection.query(query, (err, rows)=>{
        if (!err) {
            res.json({
                status: true,
                mensaje: "El estado del jugador se cambió correctamente."
            });
        } else {
            res.json({
                status: false,
                mensaje: "Hubo un error cambiando el estado del jugador."
            });
        }
    })
});


//UPDATE de un jugador.
router.put('/jugadores/:id', (req, res) => {
    let id = req.params.id;
    const { nombre,apellido,nombre_profesional,email,id_localidad,id_equipo } = req.body;
    let query = `UPDATE jugadores SET nombre='${nombre}', apellido='${apellido}', nombre_profesional='${nombre_profesional}', email='${email}', id_localidad='${id_localidad}', id_equipo='${id_equipo}'  WHERE id=${id}`;
    mysqlConnection.query(query, (err, rows) => {
        if (!err) {
            res.json({
                status: true,
                mensaje: "El jugador se editó correctamente."
            });
        } else {
            res.json({
                status: false,
                mensaje: "Hubo un error editando el jugador. Ver jugadoresRouter.js."
            });
        }
    })
})


//Siempre terminar exportando para que index.js pueda tener acceso a estas rutas.
module.exports = router;