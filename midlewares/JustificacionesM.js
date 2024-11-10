//midleware que guarda el id de la justificacion en la sesion
const Justificacion = require('../models/JustificacionModel');
const Sesion = require('../models/SesionModel');

module.exports = async (req, res, next) => {
    const { descripcion, alumno, imagen, sesion } = req.body;
    const justificacion = new Justificacion({
        descripcion,
        alumno,
        imagen,
        sesion
    });
    await justificacion.save();
    const sesionDB = await Sesion.findById(sesion);
    sesionDB.justificaciones.push(justificacion._id);
    await sesionDB.save();
    next();
}