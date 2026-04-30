// ye file me hum food provider ke liye authentication middleware banayenge taki food provider ke liye protected route bana ske jisme sirf food provider hi access kr ske aur normal user access na kr ske

const foodPartnerModel = require('../models/foodPartner.model'); // food partner model ko import kr rhe hai taki database me food partner ke data ko access kr ske
const userModel = require('../models/user.model'); // user model ko import kr rhe hai taki database me user ke data ko access kr ske
const jwt = require('jsonwebtoken'); // jsonwebtoken module ko import kr rhe hai taki token generate kr ske aur verify kr ske


const authfoodPartner = async(req ,res,next)=>{ 

    const token  = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message : "Please login to access this feature"
        })
    }

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET); // token ko verify kr rhe hai aur usme se decoded data ko le rhe hai jo object me hoga jisme user id hoga jo token generate karte sAmay payload me dala tha

        const foodPartner = await foodPartnerModel.findById(decoded.id); 

        req.foodPartner = foodPartner; // req object me foodParther property create kr rhe hai jisme food partner ke data ko store kr rhe hai taki aage ke middleware me ya route handler me use kr ske
        next(); // next middleware ko call kr rhe hai taki request aage badh ske
    }
    catch(error){
        return res.status(401).json({
            message : "Invalid token"
        })
    }
} 

const authUsermiddleware = async (req ,res, next) =>{

    const token  = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Please login first"
        })
    }

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET); // token ko verify kr rhe hai aur usme se decoded data ko le rhe hai jo object me hoga jisme user id hoga jo token generate karte sAmay payload me dala tha

        const user = await userModel.findById(decoded.id);

        req.user = user;
        next();
    }
    catch(error){
        return res.status(401).json({
            message: "Invalid token"
        })
}
}


module.exports = { authfoodPartner , authUsermiddleware}; // authfoodParther middleware ko export kr rhe hai taki use kr ske dusre file me jaha hume food provider ke liye protected route banana hai