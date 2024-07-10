import express from 'express';
import swaggerUi from 'swagger-ui-express';
import documantationSwagger from '../swagger.json' assert {type: 'json'};


const swaggerRouter = express.Router();

swaggerRouter.use('/', swaggerUi.serve);
swaggerRouter.get('/', swaggerUi.setup(documantationSwagger));


export default swaggerRouter;
