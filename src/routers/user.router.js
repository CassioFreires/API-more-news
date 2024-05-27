import express from 'express';
import { create, findAll } from '../controllers/user.controller.js';

const routerUser = express.Router();

routerUser.post('/', create);
routerUser.get('/findAll', findAll);



export default routerUser;