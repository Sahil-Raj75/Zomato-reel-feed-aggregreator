const express = require('express');
const authController = require('../controllers/auth.controllers');

const router = express.Router(); // router instance create kr rhe hai express ke router method se

//user auth api
router.post('/user/register' , authController.registerUser); // register user ke liye post request bana rhe hai aur usme authController ke registerUser method ko call kr rhe hai
router.post('/user/login', authController.loginUser);
router.get('/user/logout' , authController.logoutUser); // logout user ke liye get request bana rhe hai aur usme authController ke logoutUser method ko call kr rhe hai

// food parther auth api
router.post('/foodPartner/register' , authController.registerFoodPartner);
router.post('/foodPartner/login' , authController.loginFoodPartner);
router.get('/foodPartner/logout' , authController.logoutFoodPartner); //logout ke liye get kyu use kr rhe hai ? kyuki logout ke time hum sirf token cookie ko clear kr rhe hai aur response me ek message bhej rhe hai ki user logged out successfully , isme hume kisi bhi data ko send krne ki jarurat nahi hai isliye get request use kr rhe hai logout ke liye

module.exports = router;