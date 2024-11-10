const mongoose = require('mongoose');

const InstitucionSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Institucion', InstitucionSchema);