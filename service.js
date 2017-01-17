//instanciacion del paquete jwt(JSON Web Token) contiene el estandar abierto para la creacion de un token de autentificacion para validar las peticiones por metodos http
//https://www.npmjs.com/package/jwt-simple

var jwt = require('jwt-simple'); 

//instanciacion del paquete moment para validar la duracion del token el paquete permite el manejo de fechas 
//https://www.npmjs.com/package/moment

var moment = require('moment');  

//variables de entorno para la configuracion

var config = require('./config');

//la funcion create se encarga de instanciar el token y de devolverlo al usuario 
//se pueden anadir datos adicionales al objeto payload que es el objeto que se encarga de codificar los datos del usuario y contiene la expiracion del token
exports.createToken = function(user) {  
  var payload = {
    sub: user.idPaciente,
    iat: moment().unix(),
    exp: moment().add(14, "days").unix(),
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
};