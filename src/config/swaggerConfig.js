import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

const swaggerOptions = {
    definition:{
        openapi: '3.1.0',
        info:{
            title: 'AdoptMe API - Documentation',
            version: '1.0.0',
            description: 'API RESTful para la gestión de usuarios, mascotas y adopciones.'
        },
        servers: [
            {
                url: 'http://localhost:8080/api',
                description: 'servidor local'
            }
        ]
    },
    apis: ['./src/routes/*.js', './src/docs/*.yaml'],
};

const specs = swaggerJSDoc(swaggerOptions);

export { swaggerUiExpress, specs };