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
        type: "String",
        required: [true,'please enter a password']
    },
    avatar: {
        type: "String",
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
}, {timestamps: true});

const User = mongoose.model('User', userSchema)

export default User;