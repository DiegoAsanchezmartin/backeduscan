//modelo del foro
const mongoose = require('mongoose');

const ForoSchema = mongoose.Schema({
    profesor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
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
    vistas: {
        alumnos: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario',
            fechavista: {
                type: Date,
                default: Date.now()
            }
        }]
    }
});

module.exports = mongoose.model('Foro', ForoSchema);
