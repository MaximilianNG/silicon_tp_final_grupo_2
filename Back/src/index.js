require('dotenv').config({path:'config.env'})
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
app.use(require('./router/equiposRouter.js'))
app.use(require('./router/torneosRouter.js'))
app.use(require('./router/sponsorsRouter.js'))
app.use(require('./router/loginRouter.js'))

//Arrancar el servidor
app.listen(app.get('port'), ()=> {
    console.log("El servidor se está ejecutando en el puerto ", app.get('port'));
})