const express = require('express');
const router = express();
const jwt = require('jsonwebtoken');
const { token } = require('morgan');

// Archivo de conexión a la base de datos.
const mysqlConnection = require('../database');

///////////////  Login de usuarios administradores  ///////////////

router.post('/login', (req, res) => {
    const {usuario, password} = req.body;
    console.log("El usuario que recibi: " + usuario);
    console.log("La password que recibi: " + password);
    let query = `SELECT usuario, contraseña, estado FROM admins WHERE estado = 1;`;
    mysqlConnection.query(query, (err, rows) => {
        if (!err) {
            if(rows.length != 0) {
                console.log("No hubo error, y vino algo del back. Lo que vino:");
                console.log(rows);
                if (usuario == rows[0].usuario && password == rows[0].contraseña) {
                    jwt.sign({rows}, 'silicon', (err, token) => {
                        res.json(
                            {
                                status: true,
                                datos: rows,
                                token: token
                            });
                        console.log("El token que generé: " + token);
                    })
                } else {
                    res.json(
                        {
                            status: false,
                            mensaje: "Las credenciales ingresadas no son correctas."
                        }
                    )
                }
            }
        } else {
            res.json(
                {
                    status: false,
                    mensaje: "Hubo un error en el servidor."
                }
            )
        }
    })
})

module.exports = router;