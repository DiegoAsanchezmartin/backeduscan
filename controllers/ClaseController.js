// controlador de la clase

const Clase = require('../models/ClaseModel');
const BaseController = require('./BaseController');

class ClaseController extends BaseController {
    constructor() {
        super(Clase);
    }


    // Método para guardar estudiantes dentro de una clase usando el ID de la clase desde los parámetros y el ID del estudiante
    async agregarEstudiante(req, res) {
        const idClase = req.params.id; // Obtener el idClase desde los parámetros de la URL
        const { idEstudiante } = req.body; // Obtener el idEstudiante desde el body

        const clase = await Clase.findById(idClase); // Buscar la clase por su ID
        if (!clase) {
            return res.status(404).json({ error: 'Clase no encontrada' }); // Si no se encuentra la clase, enviar error
        }

        clase.estudiantes.push(idEstudiante); // Agregar el ID del estudiante al array de estudiantes de la clase
        await clase.save(); // Guardar la clase
        res.json(clase); // Enviar la clase como respuesta
    }

    // metodo para obtener los estudiantes de una clase
    async obtenerEstudiantes(req, res) {
        const idClase = req.params.id;
    
        try {
            const clase = await Clase.findById(idClase).populate('estudiantes');
            if (!clase) {
                return res.status(404).json({ error: 'Clase no encontrada' });
            }
            res.json(clase.estudiantes);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los estudiantes de la clase' });
        }
    }

}

module.exports = ClaseController;