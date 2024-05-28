import express from 'express';
import { auth } from '../controllers/auth.controller.js';

const routerAuth = express.Router();

routerAuth.post('/', auth);

export default routerAuth;