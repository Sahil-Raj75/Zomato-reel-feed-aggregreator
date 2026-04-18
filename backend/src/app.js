// create server

const express  = require('express'); // express module ko import kr rhe hai
const cookieParser = require('cookie-parser'); // cookie parser module ko import kr rhe hai
const authRouter = require('./routers/auth.routers');
const foodRouter = require('./routers/food.routers');
const cors = require('cors'); // cors module ko import kr rhe hai

const app = express(); // server instance create kr rhe hai
app.use(express.json()); // json data ko parse krne ke liye middleware use kr rhe hai
app.use(cookieParser()); 
// cookie parser middleware use kr rhe hai token ko cookie me store kr ske
app.use(cors({
    origin : "http://localhost:5173", // frontend ka url jaha se request aayegi
    credentials : true // credentials true kr rhe hai taki cookies bhej ske cross origin request me
})); // cors middleware use kr rhe hai cross origin requests allow krne ke liye

app.use ('/api/auth/' , authRouter); // auth router ko use kr rhe hai /api/auth/ ke route pe (prefix hai /api/auth) 
app.use('/api/food/' , foodRouter); // food router ko use kr rhe hai /api/food/ ke route pe (prefix hai /api/food)
module.exports = app; // app ko export kr rhe hai taki use kr ske dusre file me

