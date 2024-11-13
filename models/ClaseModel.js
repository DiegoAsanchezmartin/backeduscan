const mongoose = require('mongoose');

const ClaseSchema = mongoose.Schema({
    nombre: {
        type: String,
    },
    turno: {
        type: String,
    },
    profesor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    estudiantes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
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

module.exports = mongoose.model('Clase', ClaseSchema);