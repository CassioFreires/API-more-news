import mongoose from "mongoose";

const connectDatabase = async() => {
    try{
        const url = `mongodb+srv://admin:admin@cluster0.ynueket.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    return await mongoose.connect(url)
    } catch(e) {
        return console.log(e)
    }
}


export {
    connectDatabase
}