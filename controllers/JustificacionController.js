//controllador de la justificacion

const Justificacion = require('../models/JustificacionModel');
const BaseController = require('./BaseController');

class JustificacionController extends BaseController {
    constructor() {
        super(Justificacion);
    }



     // Método para obtener justificaciones por alumno
     async obtenerPorAlumno(req, res) {
        try {
            const { alumnoId } = req.params; // Obtener el ID del alumno de los parámetros
            const justificaciones = await Justificacion.find({ alumno: alumnoId }); // Buscar justificaciones por alumno
            if (!justificaciones || justificaciones.length === 0) {
                return res.status(404).json({ message: "No se encontraron justificaciones para este alumno" });
            }
            return res.status(200).json(justificaciones); // Retornar las justificaciones encontradas
        } catch (error) {
            return res.status(500).json({ message: "Error al obtener las justificaciones", error });
        }
    }

    // Método para obtener justificaciones por sesión
    async obtenerPorSesion(req, res) {
        try {
            const { sesionId } = req.params; // Obtener el ID de la sesión de los parámetros
            const justificaciones = await Justificacion.find({ sesion: sesionId }); // Buscar justificaciones por sesión
            if (!justificaciones || justificaciones.length === 0) {
                return res.status(404).json({ message: "No se encontraron justificaciones para esta sesión" });
            }
            return res.status(200).json(justificaciones); // Retornar las justificaciones encontradas
        } catch (error) {
            return res.status(500).json({ message: "Error al obtener las justificaciones", error });
        }
    }





}

module.exports = JustificacionController;