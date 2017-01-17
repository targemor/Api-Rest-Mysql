var connection = require('../connection');
var service = require('../service');
module.exports.get = function(res) {
    connection.acquire(function(err, con) {
        con.query('select * from usuario', function(err, result) {
            if (err) {
                throw err;
            } else {
                con.release();
                res.send(result);
            }
        });
    });
};
module.exports.create = function(usuario, res) {
    connection.acquire(function(err, con) {
        con.query('insert into usuario set ?', usuario, function(err, result) {
            con.release();
            if (err) {
                throw err;
                res.send({
                    status: 1,
                    message: 'La creacion del usuario fallo'
                });
            } else {
                res.send({
                    status: 0,
                    message: 'Usuario creado con exito'
                });
            }
        });
    });
};
module.exports.checkUser = function(usuario, res) {
    // body...
    connection.acquire(function(err, con) {
        con.query('select * from usuario where email=?', [usuario.email], function(err, result) {
            // body...
            //con.release();
            if (err) {
                throw err;
                res.send({
                    status: 1,
                    message: 'Ha ocurrido un error '
                });
            } else {
                if (isEmptyJSON(result)) {
                    res.json({
                        message: 'Usuario no encontrado'
                    });
                } else {
                    var objeto = result[0];
                    if (objeto.password != usuario.password) {
                        res.json({
                            success: false,
                            message: 'Password o Email incorrectos .'
                        });
                    } else {
                        var idPaciente;
                        // return the information including token as JSON
                        con.query('select idPaciente from paciente where idUsuario=?', objeto.idUsuario, function(err, result) {
                            // body...
                            if (err) {
                                throw err;
                            } else {
                                idPaciente = result[0];
                                res.json({
                                    success: true,
                                    token: service.createToken(idPaciente)
                                });
                            }
                        });
                    }
                }
            }
        });
    });
};

function isEmptyJSON(obj) {
    for (var i in obj) {
        return false;
    }
    return true;
}