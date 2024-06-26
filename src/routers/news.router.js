import express from 'express';
import { create, findAll, findById, update, exclude, topNews, searchNewsByTitle, searchNewsByUser, updateNewsByUser, excludeNewsByUser, like, comment, deleteComment } from '../controllers/news.controller.js';
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
routerNews.get('/searchNewsByUser', AuthMiddleware, validUser, searchNewsByUser);
routerNews.patch('/updateNewsByUser/:id', AuthMiddleware, validId, updateNewsByUser);
routerNews.delete('/deleteNewsByUser/:id', AuthMiddleware, validId, excludeNewsByUser);

routerNews.patch('/like/:id', AuthMiddleware, validId, like);
routerNews.patch('/comment/:id',AuthMiddleware, validId, comment);
routerNews.patch('/deleteComment/:id/:idComment', AuthMiddleware, validId, deleteComment);


export default routerNews;