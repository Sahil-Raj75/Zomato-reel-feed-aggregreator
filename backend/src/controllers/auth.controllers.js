const UserModel = require('../models/user.model'); 
const FoodPartnerModel = require("../models/foodPartner.model");// user model ko import kr rhe hai
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    const {name , email  , password , phonenumber} = req.body; // destructuring req.body se name , email aur password ko extract kr rhe hai


const isUserAlreadyExist = await UserModel.findOne({email}) // find user in database with email

if(isUserAlreadyExist){ // if user already exist in database then return error message
    return res.status(400).json({
        message : "User already exists"
    })
}

    const hashedPassword =  await bcrypt.hash(password,10); // 10 round hashing - more strong

    const user = await UserModel.create({ // create user in database
        name,
        email,
        password : hashedPassword,
        phonenumber,
    })

    const token = jwt.sign({ // create token with user id as payload
        id : user._id, // payload me user id dal rhe hai
    } , process.env.JWT_SECRET) // secret key for token

    res.cookie("token"  , token ) // token ko cookie me store kr rhe hai
     
    res.status(201).json({ // status ka kaamn hai frontend ko batana ki request successful ho gai hai;
        message : "User registered successfully",
        user : {
            _id : user._id,
            name : user.name,
            email : user.email,
            phonenumber : user.phonenumber
        }
    })
    console.log(user);
}

const loginUser = async (req, res) => {

    const {email,password} = req.body;

    const user = await UserModel.findOne({email}); // find user in database with the email;

    if(!user){ // if user not found in database then return error message
        return res.status(400).json({
            message  : "Invalid email and user not found"
        })
    }

    const isPasswordMatch = await bcrypt.compare(password,user.password); // user.password is the hashed password stored in database and the password jo user enter kr rha hai frontend me tho match kase hoga? 

    if(!isPasswordMatch){ // if password not match then return error message
        return res.status(400).json({
            message : "Invalid password"
        })    
    }
     
    const token = jwt.sign({
        id : user._id
    } , process.env.JWT_SECRET) // secret key for token

    res.cookie("token" , token)

    res.status(200).json({
        message : "User logged in successfully",
        user : {
            _id : user._id,
            name : user.name,
            email : user.email
        }
    })
}  

const logoutUser = async(req ,res) =>{
    res.clearCookie("token"); // token cookie ko clear kr rhe hai logout ke time
    res.status(200).json({
        messgae : "User logged out successfully"
    })
}

const registerFoodPartner = async(req ,res) =>{
    const { name, email, password, ownerName, restaurantName, phonenumber, restaurantaddress } = req.body;

    const isFoodPartherAlreadyExists = await FoodPartnerModel.findOne({email});

    if(isFoodPartherAlreadyExists){
        res.status(400).json({
            message : "Food parther already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const foodPartner = await FoodPartnerModel.create({
        name,
        email,
        password: hashedPassword,
        ownerName,
        restaurantName,
        phonenumber,
        restaurantaddress
    })

    const token  = jwt.sign({
        id : foodPartner._id,// foodPartner yaha use hoga ajb payload me id dal rhe hai token ke liye
    } , process.env.JWT_SECRET)  

    res.cookie("token" , token);

    res.status(200).json({
        message : "Food parther registered successfully",
        foodPartner :{ // food parther ke properties ko frontend (response me) bhej rhe hai
            _id : foodPartner._id,
            name : foodPartner.name,
            email : foodPartner.email,
            ownerName: foodPartner.ownerName,
            restaurantName: foodPartner.restaurantName,
        }
    }) 
}

const loginFoodPartner = async(req , res) =>{

    const {email , password} = req.body;

    const foodPartner = await FoodPartnerModel.findOne({email});

    if(!foodPartner){
        res.status(400).json({
            message : "Invalid email and food parther not found"
        })
    }
    
    const isValidPassword = await bcrypt.compare(password , foodPartner.password);

    if(!isValidPassword){
        res.status(400).json({
            message : "Invalid password"
        })
    }

    const token = jwt.sign({
        id : foodPartner._id
    } , process.env.JWT_SECRET)

    res.cookie("token" , token);

    res.status(200).json({
        message : "Food parther logged in successfully",
        foodPartner : {
            _id : foodPartner._id,
            name : foodPartner.name,
            email : foodPartner.email
        }
    })
}

const logoutFoodPartner= async(req, res) =>{
    res.clearCookie("token");

    res.status(200).json({
        message : "Food parther logged out successfully"
    })
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}
