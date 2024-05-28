import UserModel from "../models/User.model.js";
import jwt from 'jsonwebtoken';

const findByEmailService = (email) =>UserModel.findOne({email: email}).select('+password')
const generatorToken = (id) => jwt.sign({id: id}, process.env.PRIVATE_KEY, {expiresIn: 86400})


export {
    findByEmailService,
    generatorToken
}