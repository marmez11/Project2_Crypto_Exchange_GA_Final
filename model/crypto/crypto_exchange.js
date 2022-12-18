// create library/packages dependencies and express 
const { builtinModules } = require("module");
const mongoose = require('./crypto_exchange_connection')

// dealing with DeprecationWarning: Mongoose
mongoose.set('strictQuery', false);

// extracting schemas and models from mongoose database
const {Schema, model} = mongoose

// making Database/Data Schema for cryptocurrencies
const crypto_exchange_schema = new Schema ({
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

const bitcoin_schema = new Schema({
    bitcoin_id: Number,
    bitcoin_price: Number,
    bitcoin_circulating_supply: String,
    bitcoin_cryptocurrency_popularity: Number,
    bitcoin_marketCap: String,
    bitcoin_price_change_1D: String,
    bitcoin_price_change_7D: String
})

const ethereum_schema = new Schema({
    ethereum_id: Number,
    ethereum_price: Number,
    ethereum_circulating_supply: String,
    ethereum_cryptocurrency_popularity: Number,
    ethereum_marketCap: String,
    ethereum_price_change_1D: String,
    ethereum_price_change_7D: String
})

const crypto_ethereum = model('crypto_ethereum', ethereum_schema)

const crypto_bitcoin = model('crypto_bitcoin', bitcoin_schema)

const crypto_exchange = model('crypto_exchange', crypto_exchange_schema)

module.exports = {crypto_exchange, crypto_bitcoin, crypto_ethereum}