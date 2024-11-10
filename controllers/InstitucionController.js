const Institucion = require('../models/institucion'); 
const BaseController = require('./BaseController');

class InstitucionController extends BaseController {
    constructor() {
        super(Institucion); // Pasa el modelo Institucion al constructor de BaseController
    }
}

module.exports = InstitucionController;
