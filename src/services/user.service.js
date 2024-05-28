import UserModel from "../models/User.model.js";

const createService = (body) => UserModel.create(body);
const findAllService = () => UserModel.find({});
const findByIdService = (id) => UserModel.findById(id);
const updateService = (id, body) => UserModel.findOneAndUpdate({_id: id}, body)

export {
    createService,
    findAllService,
    findByIdService,
    updateService
}