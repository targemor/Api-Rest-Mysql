//instancias variables paquetes de node y app de express

var express = require('express');
var bodyParser = require('body-parser');

//instanciacion de variables de coneccion a base de datos y rutas de consumo de datos
var connection = require('./connection');
var routes = require('./routes');

//inicializacion de la app de express
var app = express();

//configuracion del middleware bodyparser para poder recibir y mandar JSON
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
connection.init();

//paso de parametros de el app de express a la coneccion de la base de datos
routes.configure(app);

//inicializacion del servidor web en el puerto 3000
var server = app.listen(3000, function() {
    console.log('Server listening on port ' + server.address().port);
});