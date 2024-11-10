//controlador del foro
const Foro = require('../models/ForoModel');
const BaseController = require('./BaseController');

class ForoController extends BaseController {
    constructor() {
        super(Foro);
    }
}

module.exports = ForoController;