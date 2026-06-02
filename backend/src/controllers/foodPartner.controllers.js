const foodPartnerModel = require('../models/foodPartner.model');
const foodModel = require('../models/food.model');

const getFoodPartnerProfile = async (req, res) => {
    const foodpartnerid =  req.params.id; // url se food partner ka id le rhe hai

    const foodPartner = await foodPartnerModel.findById(foodpartnerid); // database me se food partner ke data ko find kr rhe hai us id ke basis pe
    const foodVideos = await foodModel.find({foodPartner : foodpartnerid}) // database me se food videos ke data ko find kr rhe hai us food partner ke basis pe

    if(!foodPartner){
        return res.status(404).json({
            message : "Food partner not found"
        })
    }
    
    res.status(200).json({
        message : "Food partner profile fetched successfully",
        foodPartner :{
            ...foodPartner.toObject(),
            video : foodVideos // food partner ke data ke sath uske food videos ka data bhi bhej rhe hai
        }
    }) 
}

module.exports = {
    getFoodPartnerProfile
}