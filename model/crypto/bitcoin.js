// create library/packages dependencies and express 
const { text } = require("body-parser");
const { builtinModules } = require("module");
const mongoose = require('./connection')

// dealing with DeprecationWarning: Mongoose
mongoose.set('strictQuery', false);

// extracting schemas and models from mongoose database
const { Schema, model } = mongoose

// making Database/Data Schema for cryptocurrencies
const bitcoin_schema = new Schema({
    bitcoin_id: Number,
    bitcoin_name: String,
    bitcoin_about: String,
    bitcoin_price: Number,
    bitcoin_circulating_supply: String,
    bitcoin_cryptocurrency_popularity: Number,
    bitcoin_marketCap: String,
    bitcoin_price_change_1D: String,
    bitcoin_price_change_7D: String
})

const crypto_bitcoin = model('crypto_bitcoin', bitcoin_schema)

module.exports = crypto_bitcoin