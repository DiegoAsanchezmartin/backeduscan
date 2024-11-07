const mongoose = require('mongoose');

const SesionSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    asistencia: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estudiante',
        tipoA: {
            type: String,
            required: true
        }
    }],
    estado: {
        type: Boolean,
        default: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Sesion', SesionSchema);