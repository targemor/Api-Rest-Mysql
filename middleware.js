//instanciacion del paquete jwt(JSON Web Token) contiene el estandar abierto para la creacion de un token de autentificacion para validar las peticiones por metodos http
//https://www.npmjs.com/package/jwt-simple
var jwt = require('jwt-simple');
//instanciacion del paquete moment para validar la duracion del token el paquete permite el manejo de fechas 
//https://www.npmjs.com/package/moment
var moment = require('moment');
//variables de entorno para la configuracion
var config = require('./config');

//la funcion ensureAuthenticated se encarga de verificar de que se pase como parametro la cabecera de autentificacion dentro de los parametros de llamada de algun metodo http 
//y de verificar que el token no halla expirado
exports.ensureAuthenticated = function(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({
            message: "Error"
        });
    }
    var token = req.headers.authorization;
    var payload = jwt.decode(token, config.TOKEN_SECRET);
    if (payload.exp <= moment().unix()) {
        return res.status(401).send({
            message: "The token expires"
        });
    }
    req.user = payload.sub;
    next();
}