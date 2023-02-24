const express = require('express');
const app = express();
app.use(express.json());
app.set('port' , process.env.PORT || 3302);

const morgan = require('morgan');
app.use(morgan('dev'));

const cors = require('cors');
app.use(cors());

//  Rutas
app.use(require('./router/juegosRouter.js'))
app.use(require('./router/jugadoresRouter.js'))

//Arrancar el servidor
app.listen(app.get('port'), ()=> {
    console.log("El servidor se está ejecutando en el puerto ", app.get('port'));
})