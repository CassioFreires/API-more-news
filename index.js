import express from 'express';
import { connectDatabase } from './src/database/db.js';
import routerUser from './src/routers/user.router.js';
const app = express();
const PORT = 3000;

// 
app.use(express.json());

// ROTA
app.use('/user', routerUser);

connectDatabase()
.then(() => {
    console.log('MongoDB connect successfully')
    app.listen(PORT || 8081, () => {
        console.log('server http running at port:' + PORT);
    })
})
.catch((error) => {
    return console.log(error)
})

