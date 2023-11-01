import mongoose from "mongoose";

const userSchema = new  mongoose.Schema({
    username: {
        type:"String",
        required:[true,"Please provide your name"],
        unique: true,
    },
    email: {
        type: "String",
        required: [true, 'Please provide an email'],
        unique: true,
    },
    password: {
        type: "string",
        required: [true,'please enter a password']
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema)

export default User;