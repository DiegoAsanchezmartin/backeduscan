//controlador del foro
const Foro = require('../models/ForoModel');
const Clase = require('../models/ClaseModel');
const BaseController = require('./BaseController');

class ForoController extends BaseController {
    constructor() {
        super(Foro);
    }

    // Método para guardar las vistas del foro sin repetir el usuario que lo ve
    async addVista(req, res) {
        const { foroId } = req.params;
        const { usuarioId } = req.body;

        try {
            const foro = await Foro.findById(foroId);
            if (!foro) {
                return res.status(404).json({ message: 'Foro no encontrado' });
            }

            const vistaExistente = foro.vistas.find(v => v.usuario.toString() === usuarioId);
            if (vistaExistente) {
                return res.status(400).json({ message: 'Vista ya agregada' });
            }

            foro.vistas.push({ usuario: usuarioId });
            await foro.save();
            return res.status(200).json({ message: 'Vista agregada' });
        } catch (error) {
            console.error('Error al agregar vista:', error);
            return res.status(500).json({ message: 'Error al agregar vista', error: error.message });
        }
    }

    // Método para obtener los foros a los que un estudiante está inscrito y agregar el nombre de los estudiantes que han visto cada foro
    async obtenerForosPorEstudiante(req, res) {
        const { estudianteId } = req.params;

        try {
            // Encontrar todas las clases a las que el estudiante está inscrito
            const clases = await Clase.find({ estudiantes: estudianteId }).select('_id');
            const claseIds = clases.map(clase => clase._id);

            // Encontrar todos los foros asociados a esas clases
            const foros = await Foro.find({ clase: { $in: claseIds } })
                .select('titulo descripcion fechacreacion vistas')
                .populate({
                    path: 'vistas.usuario',
                    select: 'nombre'
                });

            // Modificar la estructura de la respuesta para incluir el nombre de los estudiantes y mantener el ID de las vistas
            const forosConNombres = foros.map(foro => ({
                ...foro.toObject(),
                vistas: foro.vistas.map(vista => ({
                    _id: vista._id,
                    usuario: vista.usuario.nombre,
                    fecha: vista.fecha
                }))
            }));

            res.status(200).json(forosConNombres);
        } catch (error) {
            console.error('Error al obtener los foros del estudiante:', error);
            res.status(500).json({ message: 'Error al obtener los foros del estudiante', error: error.message });
        }
    }

        
        // Método para obtener los foros de un profesor y agregar el nombre de los estudiantes que han visto cada foro
        async obtenerForosPorProfesor(req, res) {
            const { profesorId } = req.params;
    
            try {
                const foros = await Foro.find({ profesor: profesorId })
                    .populate('clase')
                    .populate({
                        path: 'vistas.usuario',
                        select: 'nombre'
                    });
    
                // Modificar la estructura de la respuesta para incluir el nombre de los estudiantes y mantener el ID de las vistas
                const forosConNombres = foros.map(foro => ({
                    ...foro.toObject(),
                    vistas: foro.vistas.map(vista => ({
                        _id: vista._id,
                        usuario: vista.usuario.nombre,
                        fecha: vista.fecha
                    }))
                }));
    
                res.status(200).json(forosConNombres);
            } catch (error) {
                console.error('Error al obtener los foros del profesor:', error);
                res.status(500).json({ message: 'Error al obtener los foros del profesor', error: error.message });
            }
        }


}

module.exports = ForoController;