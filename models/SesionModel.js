const mongoose = require('mongoose');

const SesionSchema = mongoose.Schema({

    clase: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clase',
        required: true
    },
    asistencia: [{
        estudiante: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Estudiante',
            required: true
        },
        tipoA: {
            type: String,
            enum: ['Asistio', 'Falto', 'Tarde'],
            required: true
        }
    }],
    justificaciones: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Justificacion'
    }],
    estado: {
        type: Boolean,
        default: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    },
    horadeInicio: {
        type: Date
    }
});

module.exports = mongoose.model('Sesion', SesionSchema);