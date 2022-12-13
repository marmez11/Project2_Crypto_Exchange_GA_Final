// create library/packages dependencies and express 
const { builtinModules } = require("module");
const mongoose = require('../crypto/connection')

// dealing with DeprecationWarning: Mongoose
mongoose.set('strictQuery', false);

// extracting schemas and models from mongoose database
const { Schema, model } = mongoose

// making Database/Data Schema for cryptocurrencies
const crypto_exchange_schema = new Schema({
    crypto_exchange_id: Number,
    bitcoin_id: Number,
    ethereum_id: Number,
    crypto_exchange_name: String,
    bitcoin_amount: Number,
    ethereum_amount: Number,
    bitcoin_circulating_supply: String,
    ethereum_circulating_supply: String,
    blockchain_sending_transaction_hash_id_num: String,
    blockchain_receiving_transaction_hash_id_num: String,
    order_status: String,
    transaction_date: Date
})

const crypto_exchange = model('crypto_exchange', crypto_exchange_schema)

module.exports = crypto_exchange