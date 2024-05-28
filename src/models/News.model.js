import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    banner: {
        type: String,
        required: true
    },
    creatAt: {
        type: Date,
        default: Date.now(),
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    likes: {
        type: Array,
        required: true
    },
    comments: {
        typeof: Array,
        required: true
    }

})

const NewsModel = mongoose.model('News', NewsSchema);

export default NewsModel;