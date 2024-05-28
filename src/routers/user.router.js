import express from 'express';
import { create, findAll, findById, update } from '../controllers/user.controller.js';
import { validId, validUser } from '../middlewares/Global.middlewares.js';

const routerUser = express.Router();

routerUser.post('/', create);
routerUser.get('/findAll', findAll);
routerUser.get('/findById/:id', validId, validUser, findById);
routerUser.patch('/update/:id', validId, validUser, update)



export default routerUser;