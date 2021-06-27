const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    profilePicture:{
        type: String,
        required:false,
    },
    address:{
        type:String,
        required: false
    },
    city:{
        type: String,
        required: false,
    },
    country:{
        type:String,
        required:false,
    },
    postalCode:{
        type:Number,
        required:false,
    },
    bio:{
        type:String,
        required:false,
    },
    facebook:{
        type:String,
        required:false
    },
    twitter:{
        type:String,
        required:false
    },
    linkedin:{
        type:String,
        required:false
    },

}, {
    timestamps: true,
});

const User = mongoose.model("User",userSchema);

module.exports = User;