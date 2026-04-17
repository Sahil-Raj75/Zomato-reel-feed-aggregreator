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


module.exports = router;