const express = require('express');
const router = express.Router();
const foodPartnerController = require('../controllers/foodPartner.controllers');
const authMiddleware = require('../middlewares/auth.middleware'); // auth middleware ko import kr rhe hai taki protected route bana ske

router.get('/:id' , authMiddleware.authfoodPartner , foodPartnerController.getFoodPartnerProfile); // food partner ke profile ko get krne ke liye route bana rhe hai jisme auth middleware use kr rhe hai taki sirf authenticated food partner hi apne profile ko access kr ske

module.exports = router;