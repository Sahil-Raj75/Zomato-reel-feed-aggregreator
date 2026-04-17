const mongoose = require('mongoose');

const foodPartnerSchema = new mongoose.Schema({
    name : {
        type: String
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