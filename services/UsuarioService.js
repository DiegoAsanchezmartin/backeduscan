const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UsuariosModel = require('../models/UsuarioModel');


class UsuarioService {
    static async encriptarContrasena(contrasena) {
        try {
            const salt = await bcrypt.genSalt(10);
            return await bcrypt.hash(contrasena, salt);
        } catch (error) {
            throw new Error('Error al encriptar la contraseña');
        }
    }

    static async compararContrasena(contrasenaIngresada, contrasenaGuardada) {
        try {
            return await bcrypt.compare(contrasenaIngresada, contrasenaGuardada);
        } catch (error) {
            throw new Error('Error al comparar la contraseña');
        }
    }

    static async autenticarUsuario(correo, contrasena) {
        try {
            const usuario = await UsuariosModel.findOne({ correo });
            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }

            const esContrasenaValida = await this.compararContrasena(contrasena, usuario.contrasena);
            if (!esContrasenaValida) {
                throw new Error('Contraseña incorrecta');
            }

            return usuario;
        } catch (error) {
            throw new Error(`Error en autenticación: ${error.message}`);
        }
    }

    static async generarToken(usuario) {
        try {
            const payload = {
                id: usuario._id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                correo: usuario.correo,
                rol: usuario.rol
            };

            return jwt.sign(payload, 'secretonotansecreto');
        } catch (error) {
            throw new Error('Error al generar el token');
        }
    }

    static async registrarUsuario(usuario) {
        try {
            const usuarioExistente = await UsuariosModel.findOne({ correo: usuario.correo });
            if (usuarioExistente) {
                throw new Error('El correo ya está registrado');
            }

            const contrasenaEncriptada = await this.encriptarContrasena(usuario.contrasena);
            const nuevoUsuario = new UsuariosModel({
                ...usuario,
                contrasena: contrasenaEncriptada
            });

            await nuevoUsuario.save();

            return { mensaje: 'Usuario creado con éxito' };
        } catch (error) {
            throw new Error(`Error al registrar el usuario: ${error.message}`);
        }
    }

    static async actualizarUsuario(id, newusuario) {
        try {
            if (newusuario.contrasena) {
                newusuario.contrasena = await this.encriptarContrasena(newusuario.contrasena);
            }

            const usuarioActualizado = await UsuariosModel.findByIdAndUpdate(id, newusuario, { new: true });

            if (!usuarioActualizado) {
                throw new Error('Usuario no encontrado');
            }

            return usuarioActualizado;
        } catch (error) {
            throw new Error(`Error al actualizar el usuario: ${error.message}`);
        }
    }
}

module.exports = UsuarioService;