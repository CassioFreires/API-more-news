import express from 'express';
import { create, findAll, findById, update } from '../controllers/user.controller.js';
import { validId, validUser } from '../middlewares/Global.middlewares.js';
import {AuthMiddleware} from '../middlewares/Auth.middlewares.js';

const routerUser = express.Router();

routerUser.post('/', create);
routerUser.get('/findAll', AuthMiddleware, findAll);
routerUser.get('/findById/:id', AuthMiddleware, validId, validUser, findById);
routerUser.patch('/update/:id', validId, validUser, update)



export default routerUser;