//instanciacion de variable con el driver de mysql
var mysql = require('mysql');

//llamado a las variables de entorno 
var config= require('./config');

//funcion callback instanciacion de la coneccion a la base de datos 
//https://www.npmjs.com/package/mysql#pool-events
function Connection() {
    this.pool = null;
    this.init = function() {
        this.pool = mysql.createPool({
            
            host:config.host,
            user:config.user,
            password:config.password,
            database:config.database
           
        });
    };
    this.acquire = function(callback) {
        this.pool.getConnection(function(err, connection) {
            callback(err, connection);
        });
    };
}
//exportacion de la funcion de la variable de coneccion 
module.exports = new Connection();
