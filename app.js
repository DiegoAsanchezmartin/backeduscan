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
  app.use(express.urlencoded({ extended: false })); // Para recibir datos de formularios

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

// Rutas para usuarios

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           example: "Juan"
 *         apellido:
 *           type: string
 *           example: "Pérez"
 *         correo:
 *           type: string
 *           example: "juan.perez@example.com"
 *         contrasena:
 *           type: string
 *           example: "password123"
 *         rol:
 *           type: string
 *           enum: [Estudiante, Profesor]
 *           example: "Estudiante"
 *         fechaRegistro:
 *           type: string
 *           format: date-time
 *           example: "2023-11-06T14:32:00Z"
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Error al obtener los usuarios
 */
app.get('/usuarios', usuarioController.obtenerTodos.bind(usuarioController));

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario obtenido con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al obtener el usuario
 */
app.get('/usuarios/:id', usuarioController.obtenerPorId.bind(usuarioController));

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Actualiza un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Usuario actualizado con éxito
 *       400:
 *         description: Error al actualizar el usuario
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al actualizar el usuario
 */
app.put('/usuarios/:id', usuarioController.actualizar.bind(usuarioController));

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Elimina un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado con éxito
 *       400:
 *         description: Error al eliminar el usuario
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al eliminar el usuario
 */
app.delete('/usuarios/:id', usuarioController.eliminar.bind(usuarioController));



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

// rutas para las clases
const ClaseController = require('./controllers/ClaseController');
const claseController = new ClaseController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Clase:
 *       type: object
 *       required:
 *         - nombre
 *         - descripcion
 *         - profesor
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre de la clase
 *         turno:
 *           type: string
 *           description: Turno de la clase
 *         profesor:
 *           type: string
 *           description: ID del profesor que imparte la clase
 *         estudiantes:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de IDs de estudiantes inscritos en la clase
 *         estado:
 *           type: boolean
 *           description: Estado de la clase (activa/inactiva)
 *         fechaCreacion:
 *           type: string
 *           format: date
 *           description: Fecha de creación de la clase
 *       example:
 *         nombre: "Matemáticas Avanzadas"
 *         turno: "Matutino" 
 *         profesor: "64d6f9f8570c3f0f6c2e3a17"
 *         estudiantes: ["64d6f9f8570c3f0f6c2e3a17", "64d6f9f8570c3f0f6c2e3a18"]
 *         estado: true
 *         fechaCreacion: "2023-09-12T10:00:00.000Z"
 */ 

/**
 * @swagger
 * /clases:
 *   post:
 *     summary: Crea una nueva clase
 *     tags: [Clases]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Clase'
 *     responses:
 *       200:
 *         description: Clase creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clase'
 */
app.post('/clases', claseController.crear.bind(claseController));

/**
 * @swagger
 * /clases:
 *   get:
 *     summary: Obtiene todas las clases
 *     tags: [Clases]
 *     responses:
 *       200:
 *         description: Lista de todas las clases
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Clase'
 */
app.get('/clases', claseController.obtenerTodos.bind(claseController));

/**
 * @swagger
 * /clases/{id}:
 *   get:
 *     summary: Obtiene una clase por su ID
 *     tags: [Clases]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la clase
 *     responses:
 *       200:
 *         description: Clase encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clase'
 *       404:
 *         description: Clase no encontrada
 */

app.get('/clases/:id', claseController.obtenerPorId.bind(claseController));

/**
 * @swagger
 * /clases/{id}:
 *   put:
 *     summary: Actualiza una clase por su ID
 *     tags: [Clases]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la clase
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Clase'
 *     responses:
 *       200:
 *         description: Clase actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clase'
 *       404:
 *         description: Clase no encontrada
 */
app.put('/clases/:id', claseController.actualizar.bind(claseController));

/**
 * @swagger
 * /clases/{id}:
 *   delete:
 *     summary: Elimina una clase por su ID
 *     tags: [Clases]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la clase
 *     responses:
 *       200:
 *         description: Clase eliminada exitosamente
 *       404:
 *         description: Clase no encontrada
 */
app.delete('/clases/:id', claseController.eliminar.bind(claseController));

/**
 * @swagger
 * /clasesagregar/{id}:
 *   put:
 *     summary: Agrega un estudiante a una clase existente
 *     tags: [Clases]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la clase
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idEstudiante:
 *                 type: string
 *                 description: ID del estudiante a agregar
 *             example:
 *               idEstudiante: "64d6f9f8570c3f0f6c2e3a18"
 *     responses:
 *       200:
 *         description: Estudiante agregado exitosamente a la clase
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clase'
 *       404:
 *         description: Clase no encontrada
 */
app.put('/clasesagregar/:id', claseController.agregarEstudiante.bind(claseController));

/**
 * @swagger
 * /clasesestudiantes/{id}:
 *   get:
 *     summary: Obtiene los estudiantes de una clase
 *     tags: [Clases]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la clase
 *     responses:
 *       200:
 *         description: Lista de estudiantes de la clase
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   nombre:
 *                     type: string
 *                   apellido:
 *                     type: string
 *               example:
 *                 - _id: "64d6f9f8570c3f0f6c2e3a17"
 *                   nombre: "Juan"
 *                   apellido: "Pérez"
 *                 - _id: "64d6f9f8570c3f0f6c2e3a18"
 *                   nombre: "Ana"
 *                   apellido: "Gómez"
 *       404:
 *         description: Clase no encontrada
 */
app.get('/clasesestudiantes/:id', claseController.obtenerEstudiantes.bind(claseController));


// rutas para los sesiones
const SesionController = require('./controllers/SesionController');
const sesionController = new SesionController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Sesion:
 *       type: object
 *       required:
 *         - nombre
 *         - clase
 *         - asistencia
 *         - horadeInicio
 *         - horaFin
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre de la sesión
 *         descripcion:
 *           type: string
 *           description: Descripción de la sesión
 *         clase:
 *           type: string
 *           description: ID de la clase a la que pertenece la sesión
 *         asistencia:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               estudiante:
 *                 type: string
 *                 description: ID del estudiante
 *               tipoA:
 *                 type: string
 *                 enum: ['Asistio', 'Falto', 'Tarde']
 *                 description: Estado de asistencia del estudiante
 *         justificaciones:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de IDs de justificaciones para la sesión
 *         estado:
 *           type: boolean
 *           description: Estado de la sesión (activa o inactiva)
 *         fechaCreacion:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación de la sesión
 *         horadeInicio:
 *           type: string
 *           format: date-time
 *           description: Hora de inicio de la sesión
 *         horaFin:
 *           type: string
 *           format: date-time
 *           description: Hora de fin de la sesión
 *       example:
 *         nombre: "Matemáticas 101 - Sesión 1"
 *         descripcion: "Primera sesión introductoria de matemáticas"
 *         clase: "64d6f9f8570c3f0f6c2e3a18"
 *         asistencia:
 *           - estudiante: "64d6f9f8570c3f0f6c2e3a17"
 *             tipoA: "Asistio"
 *           - estudiante: "64d6f9f8570c3f0f6c2e3a18"
 *             tipoA: "Falto"
 *         justificaciones: ["64d6f9f8570c3f0f6c2e3a19"]
 *         estado: true
 *         fechaCreacion: "2024-11-08T10:30:00Z"
 *         horadeInicio: "2024-11-08T11:00:00Z" 
 *         horaFin: "2024-11-08T12:30:00Z"
 */


/**
 * @swagger
 * /sesiones:
 *   post:
 *     summary: Crea una nueva sesión
 *     tags: [Sesiones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sesion'
 *     responses:
 *       201:
 *         description: Sesión creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sesion'
 *       400:
 *         description: Error en los datos proporcionados
 */
app.post('/sesiones', sesionController.crear.bind(sesionController));

/**
 * @swagger
 * /sesiones:
 *   get:
 *     summary: Obtiene todas las sesiones
 *     tags: [Sesiones]
 *     responses:
 *       200:
 *         description: Lista de sesiones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sesion'
 */
app.get('/sesiones', sesionController.obtenerTodos.bind(sesionController));

/**
 * @swagger
 * /sesiones/{id}:
 *   get:
 *     summary: Obtiene una sesión por ID
 *     tags: [Sesiones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la sesión
 *     responses:
 *       200:
 *         description: Detalles de la sesión
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sesion'
 *       404:
 *         description: Sesión no encontrada
 */
app.get('/sesiones/:id', sesionController.obtenerPorId.bind(sesionController));

/**
 * @swagger
 * /sesiones/{id}:
 *   put:
 *     summary: Actualiza una sesión por ID
 *     tags: [Sesiones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la sesión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sesion'
 *     responses:
 *       200:
 *         description: Sesión actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sesion'
 *       404:
 *         description: Sesión no encontrada
 */
app.put('/sesiones/:id', sesionController.actualizar.bind(sesionController));

/**
 * @swagger
 * /sesiones/{id}:
 *   delete:
 *     summary: Elimina una sesión por ID
 *     tags: [Sesiones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la sesión
 *     responses:
 *       204:
 *         description: Sesión eliminada exitosamente
 *       404:
 *         description: Sesión no encontrada
 */
app.delete('/sesiones/:id', sesionController.eliminar.bind(sesionController));

/**
 * @swagger
 * /sesiones/clase/{id}:
 *   get:
 *     summary: Obtiene todas las sesiones de una clase
 *     tags: [Sesiones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la clase para obtener sus sesiones
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de sesiones encontradas para la clase especificada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sesion'
 *       404:
 *         description: No se encontraron sesiones para la clase especificada
 *       500:
 *         description: Error del servidor
 */

app.get('/sesiones/clase/:id', sesionController.obtenerSesionesDeClase.bind(sesionController));

// rutas para las justificaciones
const JustificacionController = require('./controllers/JustificacionController');
const justificacionController = new JustificacionController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Justificacion:
 *       type: object
 *       required:
 *         - descripcion
 *         - alumno
 *         - sesion
 *       properties:
 *         descripcion:
 *           type: string
 *           description: Descripción de la justificación
 *         alumno:
 *           type: string
 *           description: ID del alumno al que pertenece la justificación
 *         evidencia:
 *           type: boolean
 *           description: Indicador de si hay evidencia asociada a la justificación
 *         fecha:
 *           type: string
 *           format: date-time
 *           description: Fecha en que se crea la justificación
 *         sesion:
 *           type: string
 *           description: ID de la sesión asociada a la justificación
 *         estado:
 *           type: boolean
 *           description: Estado de la justificación (activa o inactiva)
 *       example:
 *         descripcion: "El estudiante no pudo asistir debido a una emergencia personal."
 *         alumno: "64d6f9f8570c3f0f6c2e3a18"
 *         evidencia: true
 *         fecha: "2024-11-08T10:30:00Z"
 *         sesion: "64d6f9f8570c3f0f6c2e3a20"
 *         estado: true
 */

/**
 * @swagger
 * /justificaciones:
 *   post:
 *     summary: Crea una nueva justificación
 *     tags: [Justificaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Justificacion'
 *     responses:
 *       201:
 *         description: Justificación creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Justificacion'
 *       400:
 *         description: Error en los datos proporcionados
 */
app.post('/justificaciones', justificacionController.crear.bind(justificacionController));

/**
 * @swagger
 * /justificaciones:
 *   get:
 *     summary: Obtiene todas las justificaciones
 *     tags: [Justificaciones]
 *     responses:
 *       200:
 *         description: Lista de justificaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Justificacion'
 */
app.get('/justificaciones', justificacionController.obtenerTodos.bind(justificacionController));

/**
 * @swagger
 * /justificaciones/{id}:
 *   get:
 *     summary: Obtiene una justificación por ID
 *     tags: [Justificaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la justificación
 *     responses:
 *       200:
 *         description: Detalles de la justificación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Justificacion'
 *       404:
 *         description: Justificación no encontrada
 */
app.get('/justificaciones/:id', justificacionController.obtenerPorId.bind(justificacionController));

/**
 * @swagger
 * /justificaciones/{id}:
 *   put:
 *     summary: Actualiza una justificación por ID
 *     tags: [Justificaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la justificación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Justificacion'
 *     responses:
 *       200:
 *         description: Justificación actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Justificacion'
 *       404:
 *         description: Justificación no encontrada
 */
app.put('/justificaciones/:id', justificacionController.actualizar.bind(justificacionController));

/**
 * @swagger
 * /justificaciones/{id}:
 *   delete:
 *     summary: Elimina una justificación por ID
 *     tags: [Justificaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la justificación
 *     responses:
 *       204:
 *         description: Justificación eliminada exitosamente
 *       404:
 *         description: Justificación no encontrada
 */
app.delete('/justificaciones/:id', justificacionController.eliminar.bind(justificacionController));

/**
 * @swagger
 * /justificaciones/alumno/{alumnoId}:
 *   get:
 *     summary: Obtiene todas las justificaciones de un alumno
 *     tags: [Justificaciones]
 *     parameters:
 *       - in: path
 *         name: alumnoId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del alumno
 *     responses:
 *       200:
 *         description: Lista de justificaciones del alumno
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Justificacion'
 *       404:
 *         description: No se encontraron justificaciones para este alumno
 *       500:
 *         description: Error interno del servidor
 */
app.get('/justificaciones/alumno/:alumnoId', justificacionController.obtenerPorAlumno.bind(justificacionController));

/**
 * @swagger
 * /justificaciones/sesion/{sesionId}:
 *   get:
 *     summary: Obtiene todas las justificaciones de una sesión
 *     tags: [Justificaciones]
 *     parameters:
 *       - in: path
 *         name: sesionId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la sesión
 *     responses:
 *       200:
 *         description: Lista de justificaciones de la sesión
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Justificacion'
 *       404:
 *         description: No se encontraron justificaciones para esta sesión
 *       500:
 *         description: Error interno del servidor
 */
app.get('/justificaciones/sesion/:sesionId', justificacionController.obtenerPorSesion.bind(justificacionController));



//rutas poara el foro
const ForoController = require('./controllers/ForoController');
const foroController = new ForoController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Foro:
 *       type: object
 *       required:
 *         - profesor
 *         - titulo
 *       properties:
 *         profesor:
 *           type: string
 *           description: ID del profesor que creó el foro
 *         titulo:
 *           type: string
 *           description: Título del foro
 *         descripcion:
 *           type: string
 *           description: Descripción del foro
 *         fechacreacion:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del foro
 *         vistas:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               alumno:
 *                 type: string
 *                 description: ID del alumno que vio el foro
 *               fechavista:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha en que el alumno vio el foro
 *       example:
 *         profesor: "64d6f9f8570c3f0f6c2e3a18"
 *         titulo: "Foro sobre nuevas estrategias de enseñanza"
 *         descripcion: "Este foro discute las nuevas metodologías aplicadas en la enseñanza."
 *         fechacreacion: "2024-11-08T10:30:00Z"
 *         vistas: 
 *           - alumno: "64d6f9f8570c3f0f6c2e3a19"
 *             fechavista: "2024-11-08T12:00:00Z"
 */

/**
 * @swagger
 * /foros:
 *   post:
 *     summary: Crea un nuevo foro
 *     tags: [Foros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Foro'
 *     responses:
 *       201:
 *         description: Foro creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Foro'
 *       400:
 *         description: Error en los datos proporcionados
 */
app.post('/foros', foroController.crear.bind(foroController));

/**
 * @swagger
 * /foros:
 *   get:
 *     summary: Obtiene todos los foros
 *     tags: [Foros]
 *     responses:
 *       200:
 *         description: Lista de foros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Foro'
 */
app.get('/foros', foroController.obtenerTodos.bind(foroController));

/**
 * @swagger
 * /foros/{id}:
 *   get:
 *     summary: Obtiene un foro por ID
 *     tags: [Foros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del foro
 *     responses:
 *       200:
 *         description: Detalles del foro
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Foro'
 *       404:
 *         description: Foro no encontrado
 */
app.get('/foros/:id', foroController.obtenerPorId.bind(foroController));

/**
 * @swagger
 * /foros/{id}:
 *   put:
 *     summary: Actualiza un foro por ID
 *     tags: [Foros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del foro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Foro'
 *     responses:
 *       200:
 *         description: Foro actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Foro'
 *       404:
 *         description: Foro no encontrado
 */
app.put('/foros/:id', foroController.actualizar.bind(foroController));

/**
 * @swagger
 * /foros/{id}:
 *   delete:
 *     summary: Elimina un foro por ID
 *     tags: [Foros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del foro
 *     responses:
 *       204:
 *         description: Foro eliminado exitosamente
 *       404:
 *         description: Foro no encontrado
 */
app.delete('/foros/:id', foroController.eliminar.bind(foroController));


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});