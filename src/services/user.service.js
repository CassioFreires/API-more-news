import UserModel from "../models/User.model.js";

const createService = (body) => UserModel.create(body);
const findAllService = () => UserModel.find({});


export {
    createService,
    findAllService
}