const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service');
const {v4 : uuid } = require('uuid'); // for unique file name generate krne ke liye
const likeModel = require('../models/like.model');
const saveModel = require('../models/save.model');

const createFood = async (req, res) => {
        // console.log(req.file);
        // console.log(req.file.buffer); // buffer kya hai ? buffer ek temporary storage area hai jisme file ka data store hota hai jab file upload hoti hai. jab hum multer ke memory storage ko use krte hai to uploaded file ka data buffer me store hota hai. is buffer ko hum read krke file ko kisi cloud storage service me upload kr sakte hai ya fir apne server me save kr sakte hai. buffer ek tarah se file ka raw data hota hai jo ki binary format me hota hai. isse hum easily manipulate kr sakte hai jaise ki usme se kuch part nikalna ya fir usko kisi aur format me convert krna. 
        
        if(!req.foodPartner){
            return res.status(401).json({
                message : "Unauthorized access"
            })
        }

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
    await foodModel.updateMany({ saveCount: { $exists: false } }, { $set: { saveCount: 0 } })

    const fooditems = await foodModel.find({});  // {} means no filter — give me everything. 
    const userLikes = await likeModel.find({
        user: req.user._id,
        food: { $in: fooditems.map(item => item._id) }
    })

    const likedFoodIds = userLikes.map(like => like.food.toString());

    const userSaves = await saveModel.find({
        user: req.user._id,
        food: { $in: fooditems.map(item => item._id) }
    })
    const savedFoodIds = userSaves.map(save => save.food.toString());

    res.status(200).json({
        message : "Food items fetched successfully",
        fooditems,
        likedFoodIds,
        savedFoodIds
    })
}

const likeFood = async (req, res) => {
    const foodId = req.body.foodId;
    const userId = req.user._id;

    const isAlreadyLiked = await likeModel.findOne({
        user : userId,
        food : foodId
    })

    if(isAlreadyLiked){
        await likeModel.deleteOne({
            user : userId,
            food : foodId
        })

        const foodItem = await foodModel.findById(foodId);
        const newCount = Math.max(0, (foodItem?.likeCount || 0) - 1);
        await foodModel.findByIdAndUpdate(foodId, { likeCount: newCount });

        return res.status(200).json({
            message :"Food item unliked successfully"
        })
    }

    const createlike = await likeModel.create({
        user : userId,
        food : foodId
    })

    await foodModel.findByIdAndUpdate(foodId , {$inc : {likeCount : 1}}) // like count ko increase kr kr rha 

    res.status(201).json({
        message : "Food item liked successfully",
        createlike
    })
}

const saveFood = async (req, res) =>{
    const  foodId = req.body.foodId;
    const userId = req.user._id;

    const isAlreadySaved = await saveModel.findOne({
        user : userId,
        food : foodId
    })  

    if(isAlreadySaved){
        await saveModel.deleteOne({
            user : userId,
            food : foodId
        })

        const foodItem = await foodModel.findById(foodId);
        const newCount = Math.max(0, (foodItem?.saveCount || 0) - 1);
        await foodModel.findByIdAndUpdate(foodId, { saveCount: newCount });

        return res.status(200).json({
            message : "Food item unsaved successfully"
        })
    }

    const createSave = await saveModel.create({
        user : userId,
        food : foodId
    })

    await foodModel.findByIdAndUpdate(foodId , {$inc : {saveCount : 1}})

    res.status(201).json({
        message : "Food item saved successfully",
        createSave
    })
}

module.exports = {
    createFood ,
    getAllfood ,
    likeFood ,
    saveFood
}