//instanciacion de las variables que contienen los modelos de datos 
var usuarios = require('./modelos/usuarios');
var citas = require('./modelos/citas');
//instanciacion de la variable del middleware 
var middleware = require('./middleware');
module.exports = {
    configure: function(app) {
        //la ruta usuarios regresa todos los usuarios registrados dentro del sistema
        app.get('/usuarios/', function(req, res) {
            usuarios.get(res);
        });
        //la ruta signup registra un usuario nuevo
        app.post('/usuarios/nuevo-usuario', function(req, res) {
            // body...
            usuarios.create(req.body, res);
        });
        //la ruta checkUser es la que se encarga de regresar un token de autentificacion al usuario
        app.post('/checkUser/', function(req, res) {
            // body...
            // {
            //     "email": "prueba@prueba.com",
            //     "password": "prueba"
            // }
            usuarios.checkUser(req.body, res);
        });
        //funcion de testeo para verificar la decodificacion adecuada del token 
        app.get('/private/', middleware.ensureAuthenticated, function(req, res) {
            // body...
            var token = req.headers.authorization;
            res.json({
                message: 'Estás autenticado correctamente y tu id es:' + req.user,
                token: token
            });
        });
        //la ruta /cita/create se encarga de crear citas,pasando como parametro fechaCita,hrInicio,hrFinal,idEmpleado,status en formato JSON a traves de la interfaz del cliente
        //el segundo parametro de la ruta es la funcion ensureAuthenticated que verificara que el token no halla caducado y decodifica los parametros del payload del token para hacer 
        //las consultas correspondientes para la creacion de la cita y los pasa por parametro a la funcion create con la variable objeto
        app.post('/cita/create', middleware.ensureAuthenticated, function(req, res) {
            // body...
            /* 
                    objeto test
                    {
                        "fechaCita":"2016-06-29",
                        "hrInicio":"12 am",
                        "hrFinal":"1 pm",
                        "idEmpleado":"1",
                        "status":"1"
                    }

            */
            var usuario = req.body;
            usuario.idPaciente = req.user;
            citas.create(usuario, res);
        });
        //la ruta /cita/getCitas regresa en formato JSON y arreglo de objetos que contiene todas las citas progrmadas para el usuario 
        app.get('/cita/getCitas', middleware.ensureAuthenticated, function(req, res) {
            var usuario = {
                idPaciente: req.user
            }
            citas.getCitas(usuario, res);
        });
    }
};
//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMsImlhdCI6MTQ4MzQ4NjkyMiwiZXhwIjoxNDg0Njk2NTIyfQ.0Jng2SxsimXEVGaYZk6fqtRXSKr6MoaCGdhc7XELO5U