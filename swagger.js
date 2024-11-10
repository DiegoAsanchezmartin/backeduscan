const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Sistema de Asistencia API',
            version: '1.0.0',
            description: 'Documentación de la API del Sistema de Asistencia',
        },
        servers: [
            {
                url: 'http://localhost:4000',
                url:'http://187.157.236.139:4000'
                // url: 'http://localhost:4000',
                url:'http://187.157.236.139:4000'
            },
        ],
    },
    apis: ['./app.js', './controllers/*.js'], // Archivos donde se documentarán las rutas
};

const swaggerDocs = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerDocs };