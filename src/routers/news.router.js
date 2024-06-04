import express from 'express';
import { create, findAll, findById, update, exclude, topNews, searchNewsByTitle, searchNewsByUser } from '../controllers/news.controller.js';
import { AuthMiddleware } from '../middlewares/Auth.middlewares.js';
import {validId, validUser} from '../middlewares/Global.middlewares.js'

const routerNews = express.Router();

routerNews.post('/', AuthMiddleware, create);
routerNews.get('/findAll', findAll);
routerNews.get('/findById/:id', validId, findById);
routerNews.patch('/update/:id', AuthMiddleware, validId, update);
routerNews.delete('/delete/:id', AuthMiddleware, validId, exclude);

// rotas costumizadas
routerNews.get('/topNews', topNews);
routerNews.get('/searchNewsByTitle/:title', searchNewsByTitle);
routerNews.get('/searchNewsByUser/:idUser', searchNewsByUser);

export default routerNews;