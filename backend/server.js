// start server  
// const path = require('path');
// const envPath = path.join(__dirname, './src/.env'); 

// console.log('Looking for .env at:', envPath); // check the path
// console.log('File exists:', require('fs').existsSync(envPath)); // check if file exists
// require('dotenv').config({ path: envPath }); // load environment variables from .env file . ye tab chalega jab .env file src folder ke andar ho , agar .env file root folder me hai tho bas require('dotenv').config() likh do


require('dotenv').config();
console.log('MONGODB_URI:', process.env.MONGODB_URI);// dotenv module ko import kr rhe hai taki .env file se environment variables ko load kr ske
const app = require('./src/app'); // importing the app form the app.js filex
const connectDB = require('./src/db/db'); // importing the connectDB function from the db.js file

connectDB(); // calling the connectDB function to connect to the database;
const port = 3000;

app.get('/' , (req,res) =>{
    res.send('hello world');
})

app.listen(port , ()=>{
    console.log(`server is running on port ${port}`);    
})
