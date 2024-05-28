import express from 'express';
import { create, findAll, findById, update } from '../controllers/user.controller.js';
import { validId } from '../middlewares/Global.middlewares.js';

const routerUser = express.Router();

routerUser.post('/', create);
routerUser.get('/findAll', findAll);
routerUser.get('/findById/:id', validId, findById);
routerUser.patch('/update/:id', validId, update)



export default routerUser;