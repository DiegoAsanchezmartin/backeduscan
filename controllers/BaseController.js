class BaseController {
    constructor(modelo) {
        this.modelo = modelo;
    }

async crear(req, res) {
        try {
            const nuevoRegistro = await this.modelo.create(req.body); 
            res.status(201).json(nuevoRegistro);
        } catch (error) {
            console.error('Error al crear el registro:', error);
            res.status(500).json({ mensaje: 'Error al crear el registro', error: error.message });
        }
    }


async obtenerTodos(req, res) {
    const { pagina = 1, tamanoPagina = 1000, search = '' } = req.query; // Parámetros de paginación y búsqueda

    try {
        const skip = (pagina - 1) * tamanoPagina;
        let query = {};

        if (search) {
            const schemaPaths = this.modelo.schema.paths; // Obtener todos los campos del modelo
            const searchFields = Object.keys(schemaPaths); // Obtener los nombres de los campos
            const searchConditions = [];

            searchFields.forEach(field => {
                // Si el campo es de tipo String, agrega una condición de búsqueda
                if (schemaPaths[field].instance === 'String') {
                    searchConditions.push({ [field]: new RegExp(search, 'i') }); // Búsqueda insensible a mayúsculas/minúsculas
                }
            });

            if (searchConditions.length > 0) {
                query = { $or: searchConditions };
            }
        }

        const totalRegistros = await this.modelo.countDocuments(query); // Total de registros para calcular el número de páginas
        const registros = await this.modelo.find(query).skip(skip).limit(Number(tamanoPagina));

        res.status(200).json({
            registros,
            totalRegistros,
            totalPaginas: Math.ceil(totalRegistros / tamanoPagina),
            paginaActual: Number(pagina),
            tamanoPagina: Number(tamanoPagina)
        });
    } catch (error) {
        console.error('Error al obtener los registros:', error);
        res.status(500).json({ mensaje: 'Error al obtener los registros', error: error.message });
    }
}




async obtenerPorId(req, res) {
        try {
            const registro = await this.modelo.findById(req.params.id);
            if (!registro) {
                return res.status(404).json({ mensaje: 'Registro no encontrado' });
            }
            res.status(200).json(registro);
        } catch (error) {
            console.error('Error al obtener el registro por ID:', error);
            if (error.kind === 'ObjectId') {
                return res.status(400).json({ mensaje: 'ID inválido', error: error.message });
            }
            res.status(500).json({ mensaje: 'Error al obtener el registro', error: error.message });
        }
    }

async actualizar(req, res) {
        try {
            const registroActualizado = await this.modelo.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!registroActualizado) {
                return res.status(404).json({ mensaje: 'Registro no encontrado' });
            }
            res.status(200).json(registroActualizado);
        } catch (error) {
            console.error('Error al actualizar el registro:', error);
            if (error.kind === 'ObjectId') {
                return res.status(400).json({ mensaje: 'ID inválido', error: error.message });
            }
            res.status(500).json({ mensaje: 'Error al actualizar el registro', error: error.message });
        }
    }

    async eliminar(req, res) {
        try {
            const registroEliminado = await this.modelo.findByIdAndDelete(req.params.id);
            if (!registroEliminado) {
                return res.status(404).json({ mensaje: 'Registro no encontrado' });
            }
            res.status(200).json({ mensaje: 'Registro eliminado con éxito', registro: registroEliminado });
        } catch (error) {
            console.error('Error al eliminar el registro:', error);
            if (error.kind === 'ObjectId') {
                return res.status(400).json({ mensaje: 'ID inválido', error: error.message });
            }
            res.status(500).json({ mensaje: 'Error al eliminar el registro', error: error.message });
        }
    }











    
}

module.exports = BaseController;

