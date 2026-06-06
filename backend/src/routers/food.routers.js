const express = require('express');
const router = express.Router();
const foodController = require('../controllers/food.controllers');
// auth middleware ko import kr rhe hai taki protected route bana ske
const authMiddleware = require('../middlewares/auth.middleware');  

const multer  = require('multer'); // multer module ko import kr rhe hai taki file upload kr ske or server file read kr ske

const upload = multer({
    storage : multer.memoryStorage() // file ko memory me store krne ke liye multer ka memory storage use kr rhe hai taki file ko read kr ske or uske baad database me store kr ske
})

// /api/food/ [protected] means ki only food provider he use kr sakta hai normal user nhi kr sakta hai isliye is route ko protected route banayenge jisme hum middleware use krke check krnge ki user food provider hai ya nhi
router.post('/' , authMiddleware.authfoodPartner , upload.single("video") ,foodController.createFood);  //pehle authmiddleware call hoga wah token verify hoga or uske baad hi createFood controller call hoga taki sirf authenticated food provider hi food create kr ske
// GET /api/food/ [protected] 
router.get('/' , authMiddleware.authUsermiddleware , foodController.getAllfood); // normal user bhi is route ko access kr ske isliye authUsermiddleware use kr rhe hai taki sirf authenticated user hi food items dekh ske

router.post("/like", authMiddleware.authUsermiddleware , foodController.likeFood); // like karne ke liye bhi user ko authenticated hona chahiye isliye authUsermiddleware use kr rhe hai taki sirf authenticated user hi food like kr ske

router.post("/save" , authMiddleware.authUsermiddleware , foodController.saveFood); // save karne ke liye bhi user ko authenticated hona chahiye isliye authUsermiddleware use kr rhe hai taki sirf authenticated user hi food save kr ske

router.get("/save" , authMiddleware.authUsermiddleware , foodController.getSavedFood); // saved food items ko get krne ke liye bhi user ko authenticated hona chahiye isliye authUsermiddleware use kr rhe hai taki sirf authenticated user hi apne saved food items dekh ske

router.post("/comment" , authMiddleware.authUsermiddleware , foodController.commentOnFood); // comment karne ke liye bhi user ko authenticated hona chahiye isliye authUsermiddleware use kr rhe hai taki sirf authenticated user hi food items pe comment kr ske

router.get("/comment/:id" , authMiddleware.authUsermiddleware , foodController.getCommentsForFood); // kisi food item ke comments ko get krne ke liye bhi user ko authenticated hona chahiye isliye authUsermiddleware use kr rhe hai taki sirf authenticated user hi kisi food item ke comments dekh ske
module.exports = router;