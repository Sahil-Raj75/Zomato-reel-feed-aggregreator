const mongoose = require('mongoose');

const foodPartnerSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    ownerName : {
        type : String,
        required : true
    },
    restaurantName : {
        type : String,
        required : true
    },
    phonenumber : {
        type : String,
        required : true,
        unique : true
    },
    restaurantaddress :{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true,
    },
    password :{
        type : String,
        required : true,
        unique : true
    }
},{
    timestamps: true
})

const FoodPartnerModel = mongoose.model('foodPartner' , foodPartnerSchema);

module.exports = FoodPartnerModel;