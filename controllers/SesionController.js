//controlador de la sesion

const Sesion = require('../models/SesionModel');
const BaseController = require('./BaseController');

class SesionController extends BaseController {
    constructor() {
        super(Sesion); 
    }


    // Método para obtener todas las sesiones de una clase
    async obtenerSesionesDeClase(req, res) {
        const idClase = req.params.id; // Obtener el ID de la clase desde los parámetros de la URL

        try {
            // Buscar todas las sesiones relacionadas con la clase usando el ID de la clase
            const sesiones = await Sesion.find({ clase: idClase });

            if (sesiones.length === 0) {
                return res.status(404).json({ error: 'No se encontraron sesiones para esta clase' });
            }

            res.json(sesiones); // Devolver las sesiones encontradas
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener las sesiones de la clase', detalles: error });
        }
    }


}

module.exports = SesionController;