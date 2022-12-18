/*
-   Express => Web Frameworks for creating servers and making HTTP requests
-   Mongoose => Object Document Mapper (object whose structure of translating objects into other types) and establishing Database connections and making requests to Mongoose Databases
-   Method-Overrride => It is the library that allows the swapping/changing of methods of requests based on the URL query
-   EJS (External Javascript) => It is considered to be the template of indexing or showing of details
-   dotenv => allows the environmental variables and/or other variables outside the parameters of the script
-   morgan => It allows the logging of events and activities inside the server, mainly to debug
*/

/// Importing and Creating Middleware Dependencies of Libraries 
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const MongoStore = require("connect-mongo")
const session = require("express-session")
const bcrypt = require("bcryptjs");
require("dotenv").config()

/// Establishing Port number and establish Router for routes to the Crypto Exchange Server
const PORT = process.env.PORT || 3500

/// Establishing Router Routes to local host server
const cryptoRouter = require("./controllers/crypto_routes")
const userRouter = require("./controllers/user")

/////////////////////////////////////////////////
// Create our Crypto Exchange Express Application Object
/////////////////////////////////////////////////
const crypto_app = express()


/////////////////////////////////////////////////////
// Register Middleware with the App
// Middleware are just functions that handle the request and response
/////////////////////////////////////////////////////
crypto_app.use(morgan("tiny"))
crypto_app.use(morgan("dev")) // logging middleware
crypto_app.use(express.urlencoded({extended: false}))
crypto_app.use(methodOverride("_method"))
crypto_app.use("/static", express.static("public"))
/*crypto_app.use(
    session({secret: process.env.SECRET,
        store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
        saveUninitialized: true,
        resave: false,}));*/

// establish routers
crypto_app.use("/", cryptoRouter)
// crypto_app.use("/user", userRouter)

// Listneing to PORT 4600
crypto_app.listen(4600, (request, response)=>{
    console.log(`listening to port ${4600}`)
    })
