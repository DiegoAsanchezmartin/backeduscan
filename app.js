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
const dbURI = 'mongodb+srv://diegosa1203:diego12@cluster0.yqvp3pt.mongodb.net/eduscan?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.error('Error al conectar a MongoDB:', error));

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




// Rutas para instituciones
const InstitucionController = require('./controllers/InstitucionController');
const institucionController = new InstitucionController();


// En la configuración Swagger
/**
 * @swagger
 * components:
 *   schemas:
 *     Institucion:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre de la institución
 *           example: "Universidad Nacional"
 *         direccion:
 *           type: string
 *           description: Dirección de la institución
 *           example: "Avenida Siempre Viva 123"
 *         telefono:
 *           type: string
 *           description: Teléfono de la institución
 *           example: "+1234567890"
 *         estado:
 *           type: boolean
 *           description: Estado de la institución (activo/inactivo)
 *           example: true
 *         fechaCreacion:
 *           type: string
 *           format: date
 *           description: Fecha de creación de la institución
 *           example: "2024-11-06"
 */


// Rutas para instituciones
/**
 * @swagger
 * /instituciones:
 *   post:
 *     summary: Crea una nueva institución
 *     tags: [Instituciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Institucion'
 *     responses:
 *       201:
 *         description: Institución creada con éxito
 *       400:
 *         description: Error al crear la institución
 */
app.post('/instituciones', institucionController.crear.bind(institucionController));

/**
 * @swagger
 * /instituciones:
 *   get:
 *     summary: Obtiene todas las instituciones
 *     tags: [Instituciones]
 *     parameters:
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *         description: Número de página
 *       - in: query
 *         name: tamanoPagina
 *         schema:
 *           type: integer
 *         description: Tamaño de la página
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Texto para buscar en los registros
 *     responses:
 *       200:
 *         description: Lista de instituciones
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 registros:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Institucion'
 *                 totalRegistros:
 *                   type: integer
 *                   example: 50
 *                 totalPaginas:
 *                   type: integer
 *                   example: 5
 *                 paginaActual:
 *                   type: integer
 *                   example: 1
 *                 tamanoPagina:
 *                   type: integer
 *                   example: 10
 */
app.get('/instituciones', institucionController.obtenerTodos.bind(institucionController));

/**
 * @swagger
 * /instituciones/{id}:
 *   get:
 *     summary: Obtiene una institución por ID
 *     tags: [Instituciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la institución
 *     responses:
 *       200:
 *         description: Datos de la institución solicitada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Institucion'
 *       404:
 *         description: Institución no encontrada
 */
app.get('/instituciones/:id', institucionController.obtenerPorId.bind(institucionController));

/**
 * @swagger
 * /instituciones/{id}:
 *   put:
 *     summary: Actualiza una institución por ID
 *     tags: [Instituciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la institución
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Institucion'
 *     responses:
 *       200:
 *         description: Institución actualizada con éxito
 *       404:
 *         description: Institución no encontrada
 */
app.put('/instituciones/:id', institucionController.actualizar.bind(institucionController));

/**
 * @swagger
 * /instituciones/{id}:
 *   delete:
 *     summary: Elimina una institución por ID
 *     tags: [Instituciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la institución
 *     responses:
 *       200:
 *         description: Institución eliminada con éxito
 *       404:
 *         description: Institución no encontrada
 */
app.delete('/instituciones/:id', institucionController.eliminar.bind(institucionController));


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});