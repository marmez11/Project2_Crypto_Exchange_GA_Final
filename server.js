/*
-   Express => Web Frameworks for creating servers and making HTTP requests
-   Mongoose => Object Document Mapper (object whose structure of translating objects into other types) and establishing Database connections and making requests to Mongoose Databases
-   Method-Overrride => It is the library that allows the swapping/changing of methods of requests based on the URL query
-   EJS (External Javascript) => It is considered to be the template of indexing or showing of details
-   dotenv => allows the environmental variables and/or other variables outside the parameters of the script
-   morgan => It allows the logging of events and activities inside the server, mainly to debug
*/

/// Importing and Creating Middleware Dependencies of Libraries 
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const dotenv = require("dotenv")
const bcrypt = require("bcryptjs");
require("dotenv").config()

/// Establishing Port number and establish Router for routes to the Crypto Exchange Server
const PORT = process.env.PORT || 3500
const cryptoRouter = require("./controllers/crypto_routes")

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
crypto_app.use(express.urlencoded({extended: true}))
crypto_app.use(methodOverride("_method"))
crypto_app.use("/static", express.static("public"))
// establish routers
crypto_app.use("/", cryptoRouter)

// Listneing to PORT 3500
crypto_app.listen(PORT, (request, response)=>{
    console.log(`listening to port ${PORT}`)
    })
