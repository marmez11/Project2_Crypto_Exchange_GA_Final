/// Importing Libraries and Dependencies for User login page
const express = require("express")
const bcrypt = require("bcryptjs")
const User = require("../model/crypto/user")
const { response } = require("express")
const router = require("./crypto_routes")

//// Creating Router /////
const user_router = express.Router()

/// User specified Routes ///

// Signup Route
user_router.get("/User_Signup", (request, response)=> {
    response.render('user_login/signup.ejs')
})

// Signup post Route
user_router.post("/User_Signup", async(request, response)=> {
    console.log(request.query, request.body, request.session)
    request.body.password = await bcrypt.hash(request.body.password, await bcrypt.genSalt(10))

    User.create(request.body, (error, user)=>{
        response.redirect("/user/User_Login")
    })
})

// User Login Route
user_router.get("/User_Login", (request, response)=>{
    response.render("user_login/login.ejs")
})

// User Login post Route
user_router.post("/User_Login", (request, response)=>{
    const {username, password} = request.body
    User.findOne({username}, (error, user)=>{
        if(!user){
            response.send("user(s) do not exist, please enter another username")
        }
        else{
            const result = bcrypt.compareSync(password, request.body.password)
            if(result){
                request.session.username = username;
                request.session.loggedIn = true;
                response.redirect('/')
            }
            else{
                response.render("user_login/login.ejs", {data:"wrong password"})
            }
        }
    })
})
// user logout route
router.get("/User_logout", (request, response)=>{
    request.session.destroy(error => {
        response.redirect("/")
    })
})
// exporting router to the rest of the files
module.exports = router