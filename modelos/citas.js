var connection = require('../connection');
//implementar ingresar cita y borrar cita
module.exports.getCitas = function(usuario, res) {
    // body...
    connection.acquire(function(err, con) {
        // body...
        con.query('select * from cita where idPaciente=?', usuario.idPaciente, function(err, result) {
            // body...
            con.release();
            if (err) {
                throw err;
            } else {
                res.json(result);
            }
        });
    });
}
module.exports.create = function(cita, res) {
    connection.acquire(function(err, con) {
        con.query('insert into cita set ?', cita, function(err) {
            con.release();
            if (err) {
                throw err;
            } else {
                res.json({
                    mensaje: "Cita creada con exito",
                    data: cita
                });
            }
        });
    });
};
module.exports.update = function(cita, res) {
    connection.acquire(function(err, con) {
        con.query('update Cita set ? where idCita = ?', [cita, cita.idCita], function(err) {
            con.release();
            if (err) {
                throw err;
            } else {
                res.json(cita);
            }
        });
    });
};