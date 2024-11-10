//modelo de la tabla justificacion
const mongoose = require('mongoose');

const JustificacionSchema = mongoose.Schema({
    descripcion: {
        type: String,
        required: true
    },
    alumno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    evidencia: {
        Boolean
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    sesion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sesion',
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Justificacion', JustificacionSchema);