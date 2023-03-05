const express = require('express');
const router = express();

/* // Librería para encriptar passwords.
const bcrypt= require('bcrypt');
// Librería para generar tokens.
const jwt= require('jsonwebtoken'); */

// Archivo de conexión a la base de datos.
const mysqlConnection = require('../database');

///////////////  C.R.U.D. de Sponsors  ///////////////

//CREATE de un sponsor nuevo.
router.post('/sponsors', (req, res) => {
    const { nombre } = req.body;
    let query = `INSERT INTO sponsors (nombre) VALUES ('${nombre}')`;

    mysqlConnection.query(query, (err, rows) => {
        if (!err) {
            res.json({
                status: true,
                mensaje: "El sponsor se creó correctamente."
            });
        } else {
            res.json({
                status: false,
                mensaje: "Hubo un error creando el sponsor. Ver sponsorsRouter.js."
            });
        }
    })
})

//READ (GET) de todos los sponsors y lo que sponsorean.
//Esta tabla trae los campos: id, nombre (del sponsor), estado (del sponsor),
//equipo_sponsoreado que trae el Nombre del equipo y
//torneo_sponsoreado que trae el Nombre del torneo.
router.get('/sponsors', (req, res)=>{
    let query = `SELECT s.id, s.nombre, s.estado, e.nombre AS equipo_sponsoreado, "-" AS torneo_sponsoreado FROM sponsors AS s
	LEFT JOIN equipos_sponsors AS es
    ON s.id = es.id_sponsor
    LEFT JOIN equipos AS e
    ON es.id_equipo = e.id 
    UNION ALL
    SELECT s.id, s.nombre, s.estado, "-" AS equipo_sponsoreado ,t.nombre AS torneo_sponsoreado FROM sponsors AS s
    LEFT JOIN torneos_sponsors AS ts
    ON s.id = ts.id_sponsor
    LEFT JOIN torneos AS t
    ON ts.id_torneo = t.id
    ORDER BY id ASC;`;

    mysqlConnection.query(query, (err, rows)=>{
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});

//UPDATE de un sponsor - NOMBRE
router.put('/sponsorsNombre/:id', (req, res) => {
    let id = req.params.id;
    const { nombre } = req.body;
    let query = `UPDATE sponsors SET nombre = '${nombre}' WHERE id = ${id};`;

    mysqlConnection.query(query, (err, rows) => {
        if (!err) {
            res.json({
                status: true,
                mensaje: "El nombre del sponsor se editó correctamente."
            });
        } else {
            res.json({
                status: false,
                mensaje: "Hubo un error editando el nombre del sponsor. Ver sponsorsRouter.js."
            });
        }
    })
})

//UPDATE de un sponsor - NUEVO EQUIPO SPONSOREADO
router.post('/equipos_sponsors/:id', (req, res) => {
    let id = req.params.id
    const { id_equipo } = req.body;
    let query = `INSERT INTO equipos_sponsors (id_equipo, id_sponsor) VALUES ('${id_equipo}', '${id}')`;

    mysqlConnection.query(query, (err, rows) => {
        if (!err) {
            res.json({
                status: true,
                mensaje: "El equipo sponsoreado se creó correctamente."
            });
        } else {
            res.json({
                status: false,
                mensaje: "Hubo un error creando el equipo sponsoreado. Ver sponsorsRouter.js."
            });
        }
    })
})

//UPDATE de un sponsor - QUITAR EQUIPO SPONSOREADO
router.delete('/equipos_sponsors/:id', (req, res) => {
    let id = req.params.id
    const { id_equipo } = req.body;
    let query = `DELETE FROM equipos_sponsors WHERE id_equipo='${id_equipo}' AND id_sponsor='${id}'`;

    mysqlConnection.query(query, (err, rows) => {
        if (!err) {
            res.json({
                status: true,
                mensaje: "El equipo sponsoreado se quitó correctamente."
            });
        } else {
            res.json({
                status: false,
                mensaje: "Hubo un error quitando el equipo sponsoreado. Ver sponsorsRouter.js."
            });
        }
    })
})

//UPDATE de un sponsor - NUEVO TORNEO SPONSOREADO
router.post('/torneos_sponsors/:id', (req, res) => {
    let id = req.params.id
    const { id_torneo } = req.body;
    let query = `INSERT INTO torneos_sponsors (id_torneo, id_sponsor) VALUES ('${id_torneo}', '${id}')`;

    mysqlConnection.query(query, (err, rows) => {
        if (!err) {
            res.json({
                status: true,
                mensaje: "El torneo sponsoreado se creó correctamente."
            });
        } else {
            res.json({
                status: false,
                mensaje: "Hubo un error creando el torneo sponsoreado. Ver sponsorsRouter.js."
            });
        }
    })
})

//UPDATE de un sponsor - QUITAR TORNEO SPONSOREADO
router.delete('/torneos_sponsors/:id', (req, res) => {
    let id = req.params.id
    const { id_torneo } = req.body;
    let query = `DELETE FROM torneos_sponsors WHERE id_torneo='${id_torneo}' AND id_sponsor='${id}'`;

    mysqlConnection.query(query, (err, rows) => {
        if (!err) {
            res.json({
                status: true,
                mensaje: "El torneo sponsoreado se quitó correctamente."
            });
        } else {
            res.json({
                status: false,
                mensaje: "Hubo un error quitando el torneo sponsoreado. Ver sponsorsRouter.js."
            });
        }
    })
})

//DELETE lógico de un sponsor.
router.put('/estadosponsors/:id', (req, res)=>{
    let id = req.params.id;
    let estado = req.body.estado;
    let query = `UPDATE sponsors SET estado=${estado} WHERE id=${id}`;

    mysqlConnection.query(query, (err, rows)=>{
        if (!err) {
            res.json({
                status: true,
                mensaje: "El estado del sponsor se cambió correctamente."
            });
        } else {
            res.json({
                status: false,
                mensaje: "Hubo un error cambiando el estado del sponsor."
            });
        }
    })
});

//Siempre terminar exportando para que index.js pueda tener acceso a estas rutas.
module.exports = router;