//pendiente por revisar
const mongose = require('mongoose');

const EstudianteSchema = mongose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    carrera: {
        type: String,
        required: true
    },
    semestre: {
        type: Number,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongose.model('Estudiante', EstudianteSchema);