import { createService, findAllService } from "../services/user.service.js";
import mongoose from "mongoose";

const create = async (req, res) => {
    try{
        const {name, username, email, password, avatar, background} = req.body;

        if(!name || !username || !username || !email || !password || !avatar || !background){
           return res.status(400).send({message: 'Submit all fields for registration'})
        }
        

        const user = await createService(req.body);

        if(!user) {
            return res.status(400).send({message: 'Error creating User'});
        }

        res.status(201).send({
            message: 'User created successfully',
            user: {
            id: user._id,
            name,
            username,
            email,
            avatar,
            background
        }
    })
    }catch(error) {
        return res.status(500).send(error);
    }

}

const findAll = async (req, res) => {
    try {
        const user = await findAllService();

        if(user.length <= 0) {
            return res.status(400).send({message: 'Not found User'});
        }

        if(!user) {
            return res.status(400).send({message: 'Not found User'});
        }

        res.send(user)
    }catch(error) {
        return res.status(500).send(error.message);
    }
}

const findById = async (req, res) => {
    try {
        const {id} = req.params;

        if(!mongoose.isValidObjectId(id)) {
            return res.status(400).send({message: 'ID invalid'})
        }

        
    }catch(error) {
        return res.status(500).send(error)
    }
}

export {
    create,
    findAll
}