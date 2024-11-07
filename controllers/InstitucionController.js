const Institucion = require('../models/Institucion'); // Asegúrate de que la ruta es correcta
const BaseController = require('./BaseController');

class InstitucionController extends BaseController {
    constructor() {
        super(Institucion); // Pasa el modelo Institucion al constructor de BaseController
    }
}

module.exports = InstitucionController;
