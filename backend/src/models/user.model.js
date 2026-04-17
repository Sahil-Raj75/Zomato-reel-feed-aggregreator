const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    email:{
        type: String,
        required : true,
        unique : true
    },
    password:{
        type : String
    }
}, {
    timestamps : true
})

const UserModel = mongoose.model("user" , userschema); //user kya hai ? 

module.exports  = UserModel;