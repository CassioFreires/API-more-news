
import mongoose from "mongoose";
import { findByIdService } from "../services/user.service.js";

const validId = (req, res, next) => {
    const { id } = req.params;
    
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).send({ message: 'ID invalid' })
    }

    req.id = id;
    next();

}

const validUser = async (req, res, next) => {

    const userId = req.id;
    const user = await findByIdService(userId);

    if(!user) {
        return res.status(400).send({message: 'User not Found'})
    }

    req.user = user;
    next();
}

export {
    validId,
    validUser
}