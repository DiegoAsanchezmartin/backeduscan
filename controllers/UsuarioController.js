const UsuarioService = require('../services/UsuarioService');
const BaseController = require('./BaseController');
const Usuario = require('../models/UsuarioModel');

class UsuarioController extends BaseController {

    constructor() {
        super(Usuario);
    }
    
     async registrar(req, res) {
        try {
            const usuario = req.body;
            const resultado = await UsuarioService.registrarUsuario(usuario);
            res.status(201).json(resultado);
        } catch (error) {
            res.status(400).json({ mensaje: error.message });
        }
    }

     async iniciarSesion(req, res) {
        try {
            const { correo, contrasena } = req.body;
            const usuario = await UsuarioService.autenticarUsuario(correo, contrasena);
            const token = await UsuarioService.generarToken(usuario);
            res.status(200).json({ token });
        } catch (error) {
            res.status(400).json({ mensaje: error.message });
        }
    }
}

module.exports = UsuarioController;