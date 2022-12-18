const mongoose = require("mongoose")

const {Schema, model} = mongoose

const userSchema = new Schema({
    user_name: {type:String, required:true, unique:true},
    password: {type:String, required:true}
})

const user = model("User", userSchema)

module.exports = user