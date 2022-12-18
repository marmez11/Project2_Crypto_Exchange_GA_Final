//////////////////////////////////////////////
//////// Database Connections
///////////////////////////////////////////////
require("dotenv").config()  // Load env variables
const mongoose = require('mongoose') // gives us that db connection and cool methods for CRUD to the datas

// dealing with DeprecationWarning: Mongoose
mongoose.set('strictQuery', false);

const DATABASE_URL = "mongodb+srv://mrz11:Qwerasdf11!!@sei.qcrf0tv.mongodb.net/crypto?retryWrites=true&w=majority"

//Establish our connections
mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

// Log connections events from mongoose
mongoose.connection
    .on("open", ()=> console.log('Mongoose connected'))
    .on("close", ()=> console.log('Disconnected from Mongoose'))
    .on("error", (error)=> console.log('Mongoose error', error))



// export mongoose with connection to use in other files
module.exports = mongoose