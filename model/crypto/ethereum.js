// create library/packages dependencies and express 
const { text } = require("body-parser");
const { builtinModules } = require("module");
const mongoose = require('./connection')

// dealing with DeprecationWarning: Mongoose
mongoose.set('strictQuery', false);

// extracting schemas and models from mongoose database
const { Schema, model } = mongoose

// making Database/Data Schema for cryptocurrencies
const ethereum_schema = new Schema({
    ethereum_id: Number,
    ethereum_name: String,
    ethereum_about: String,
    ethereum_price: Number,
    ethereum_circulating_supply: String,
    ethereum_cryptocurrency_popularity: Number,
    ethereum_marketCap: String,
    ethereum_price_change_1D: String,
    ethereum_price_change_7D: String
})

const crypto_ethereum = model('crypto_ethereum', ethereum_schema)

module.exports = crypto_ethereum