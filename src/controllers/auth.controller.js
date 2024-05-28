import { findByEmailService, generatorToken } from "../services/auth.service.js";
import bcrypt from 'bcryptjs';

const auth = async (req, res) => {
    try{

        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).send({message: 'User invalid'})
        }
        
        const userCreated = await findByEmailService(email);

        if(userCreated == null){
            return res.status(400).send({message: 'email or password invalid'})
        }

        const passwordIsValid = bcrypt.compareSync(password, userCreated.password)

        if(!passwordIsValid) {
            return res.status(400).send({message: 'email or password invalid'})
        }
        
        const token = generatorToken(userCreated._id)

        
        res.send({
            message: 'User authenthicate successfully',
            token: token
        })
    }catch(error){
        return res.status(500).send(error.message)
    }
}

export {
    auth
}