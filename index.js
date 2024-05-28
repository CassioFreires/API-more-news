import express from 'express';
import { connectDatabase } from './src/database/db.js';
import routerUser from './src/routers/user.router.js';
import routerAuth from './src/routers/auth.router.js';
import routerNews from './src/routers/news.router.js';
import dotenv from 'dotenv'
const app = express();
const PORT = process.env.PORT || 3000;


// DOTENV
dotenv.config();
// DATA JSON
app.use(express.json());

// ROTAS
app.use('/user', routerUser);
app.use('/auth', routerAuth);
app.use('/news', routerNews);

connectDatabase()
.then(() => {
    console.log('MongoDB connect successfully')
    app.listen(PORT, () => {
        console.log('server http running at port:' + PORT);
    })
})
.catch((error) => {
    return console.log(error)
})

