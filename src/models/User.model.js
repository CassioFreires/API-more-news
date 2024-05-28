import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    avatar: {
        type: String,
        required: true
    },
    background: { 
        type: String,
        required: true},
    date: {
        type: Date,
        default: Date.now()
    }
})

UserSchema.pre('save', async function (next){
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

const UserModel = mongoose.model('Users',UserSchema);

export default UserModel;