import NewsModel from '../models/News.model.js';

const createService = (body) => NewsModel.create(body);
const findAllService = (limit, skip) => NewsModel.find({}).sort({_id: -1}).populate('user').limit(limit).skip(skip).exec();
const findByIdService = (id) => NewsModel.findById(id).sort({_id: -1}).populate('user');
const updateService = (id, body) => NewsModel.findOneAndUpdate({_id: id}, body);
const deleteByIdService = (id) => NewsModel.findOneAndDelete({_id: id})
const totalPageService = () => NewsModel.countDocuments();

const topNewsService = () => NewsModel.findOne().sort({_id: -1}).limit(1).populate('user');

const searchNewsByTitleService = (title) =>  {
    const regex = new RegExp(title, 'i');
    const result = NewsModel.find({title: regex})
    return result;
};

const searchNewsByUserService = (idUser) => NewsModel.find({user: {_id: idUser}}).sort({_id: -1}).populate('user')


export {
    createService,
    findAllService,
    findByIdService,
    updateService,
    deleteByIdService,
    totalPageService,
    topNewsService,
    searchNewsByTitleService,
    searchNewsByUserService
}