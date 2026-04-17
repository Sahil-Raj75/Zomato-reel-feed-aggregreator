const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service');
const {v4 : uuid } = require('uuid'); // for unique file name generate krne ke liye
const createFood = async (req, res) => {
        // console.log(req.file);
        // console.log(req.file.buffer); // buffer kya hai ? buffer ek temporary storage area hai jisme file ka data store hota hai jab file upload hoti hai. jab hum multer ke memory storage ko use krte hai to uploaded file ka data buffer me store hota hai. is buffer ko hum read krke file ko kisi cloud storage service me upload kr sakte hai ya fir apne server me save kr sakte hai. buffer ek tarah se file ka raw data hota hai jo ki binary format me hota hai. isse hum easily manipulate kr sakte hai jaise ki usme se kuch part nikalna ya fir usko kisi aur format me convert krna. 
        
        const fileuploadResult = await storageService.uploadFile(req.file.buffer, uuid());

        const foodItem = await foodModel.create({
            name: req.body.name,
            description: req.body.description,
            video: fileuploadResult.url,
            foodPartner: req.foodPartner._id
        });

        // console.log(foodItem);

        res.status(201).json({
            message: "Food item created successfully",
            food: foodItem
        });

    
};

const getAllfood =async(req,res)=>{
    const fooditems = await foodModel.find({});  // {} means no filter — give me everything. 
    res.status(200).json({
        message : "Food items fetched successfully",
        fooditems
    })

}

module.exports = {
    createFood ,
    getAllfood
}