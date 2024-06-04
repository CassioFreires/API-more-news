import jwt from 'jsonwebtoken';
import {findByIdService} from '../services/user.service.js'

const AuthMiddleware = async(req, res, next) => {
    try{
        const {authorization} = req.headers;

        if(!authorization) {
            return res.status(401).send({message: 'Unauthorized'});
        }

        const parts = authorization.split(' ');
        const [schema, token] = parts;

        if(parts.length !== 2) {
            return res.status(401).send({message: 'Unauthorized'});
        }

        if(parts[0] !== 'Bearer') {
            return res.status(401).send({message: 'Unauthorized'});
        }
        if(!token) {
            return res.status(401).send({message: 'Token invalid'});
        }

        jwt.verify(token, process.env.PRIVATE_KEY, async(error, decode) => {
            if(error) {
                return res.status(401).send({message: 'Unauthorized'});
            }

            const user = await findByIdService(decode.id);
            if(!user || !user._id) {
                return res.status(401).send({message: 'Token invalid'});
            }
            req.userId = decode.id;
            req.user = user;


            next();
        })

    }catch(error) {
        return res.status(400).send(error.message)
    }
}

export {
    AuthMiddleware
} 