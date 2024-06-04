import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    text: {
        type: String,
        require: true
    },
    banner: {
        type: String,
        require: true
    },
    creatAt: {
        type: Date,
        default: Date.now(),
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        require: true
    },
    likes: {
        type: Array,
    },
    
    comments: {
        type: Array,
    }

})

const NewsModel = mongoose.model('News', NewsSchema);

export default NewsModel;