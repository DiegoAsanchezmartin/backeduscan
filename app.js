// Exportaciones de módulos
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { swaggerUi, swaggerDocs } = require('./swagger');
const UsuarioController = require('./controllers/UsuarioController');
const usuarioController = new UsuarioController();

const app = express();
const PORT = 4000;

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/sistema-asistencia', {
});

// Integrar Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas para registro e inicio de sesión
/**
 * @swagger
 * /usuarios/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               correo:
 *                 type: string
 *               contrasena:
 *                 type: string
 *               rol:
 *                 type: string
 *                 enum: [Estudiante, Profesor]
 *     responses:
 *       201:
 *         description: Usuario creado con éxito
 *       400:
 *         description: Error al registrar el usuario
 */
app.post('/usuarios/register', usuarioController.registrar.bind(usuarioController));

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Inicia sesión de un usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *               contrasena:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       400:
 *         description: Error al iniciar sesión
 */
app.post('/usuarios/login', usuarioController.iniciarSesion.bind(usuarioController));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});