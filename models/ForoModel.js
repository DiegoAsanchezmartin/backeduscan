//modelo del foro
const mongoose = require('mongoose');

const vistas = mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now()
    }
});

const ForoSchema = mongoose.Schema({
    profesor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    clase: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clase',
        required: true
    },
    titulo: {
        type: String,
    },
    descripcion: {
        type: String,
    },
    fechacreacion: {
        type: Date,
        default: Date.now()
    },
    vistas: [vistas]
});

module.exports = mongoose.model('Foro', ForoSchema);
