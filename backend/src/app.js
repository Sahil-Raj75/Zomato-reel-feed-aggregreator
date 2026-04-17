// create server

const express  = require('express'); // express module ko import kr rhe hai
const cookieParser = require('cookie-parser'); // cookie parser module ko import kr rhe hai
const authRouter = require('./routers/auth.routers');
const foodRouter = require('./routers/food.routers');


const app = express(); // server instance create kr rhe hai
app.use(express.json()); // json data ko parse krne ke liye middleware use kr rhe hai
app.use(cookieParser()); // cookie parser middleware use kr rhe hai token ko cookie me store kr ske


app.use ('/api/auth/' , authRouter); // auth router ko use kr rhe hai /api/auth/ ke route pe (prefix hai /api/auth) 
app.use('/api/food/' , foodRouter); // food router ko use kr rhe hai /api/food/ ke route pe (prefix hai /api/food)
module.exports = app; // app ko export kr rhe hai taki use kr ske dusre file me

