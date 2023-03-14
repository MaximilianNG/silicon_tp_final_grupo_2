const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'registrodetorneos'
});

mysqlConnection.connect(function(err){
    if(err) {
        console.log("Mi error es: ", err);
        return;
    } else {
        console.log("La base de datos se conectó exitosamente.");
    }
});

module.exports = mysqlConnection;