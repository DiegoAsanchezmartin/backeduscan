const Sesion = require('../models/SesionModel');
const Clase = require('../models/ClaseModel');

module.exports = async (req, res, next) => {
    const { clase, nombre, descripcion } = req.body;

    // Crear una nueva sesión
    const nuevaSesion = new Sesion({
        nombre,
        descripcion,
        clase
    });

    // Guardar la nueva sesión
    await nuevaSesion.save();

    // Buscar la clase y agregar el ID de la nueva sesión
    const claseDB = await Clase.findById(clase);
    if (!claseDB) {
        return res.status(404).json({ error: 'Clase no encontrada' });
    }
    claseDB.sesiones.push(nuevaSesion._id);
    await claseDB.save();

    next();
}