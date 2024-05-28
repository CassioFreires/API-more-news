import mongoose from "mongoose";

const connectDatabase = async() => {
    try{
        const url = process.env.MONGODB_URI;
    return await mongoose.connect(url)
    } catch(e) {
        return console.log(e)
    }
}


export {
    connectDatabase
}