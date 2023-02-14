const express = require('express');
const morgan = require('morgan');
const mysqlConnection = require("./database");
const cors = require('cors');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.set('port', 3302);

//Arrancar el servidor
app.listen(app.get('port'), ()=> {
    console.log("El servidor se está ejecutando en el puerto ", app.get('port'));
})

//GET de prueba.
app.get('/', (req, res)=>{
    mysqlConnection.query('select * from departamentos', (err, rows)=>{
        res.json(rows);
    })
});