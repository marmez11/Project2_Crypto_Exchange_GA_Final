require('dotenv').config()
const mongoose = require('./crypto_exchange_connection')
const crypto_exchange = require('./crypto_exchange')

mongoose.connection.on('open', () => {
    //Data that we want to display
    const startingcrypto_exchange = [{ crypto_exchange_id: 1,
    bitcoin_id: 1,
    ethereum_id: 2,
    crypto_exchange_name: "binance",
    bitcoin_amount: 1.5,
    ethereum_amount: 2.34,
    bitcoin_circulating_supply: "150000",
    ethereum_circulating_supply: "234213",
    blockchain_sending_transaction_hash_id_num: "a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d",
    blockchain_receiving_transaction_hash_id_num: "a1062db53e416d8fa109f23b7094a21e5b2645e16c5cf532fc90e4d8fbf5d48d",
    order_status: "complete",
    transaction_date: "2011-01-22T08:00:00.000Z"
    },
    { crypto_exchange_id: 2,
    bitcoin_id: 3,
    ethereum_id: 2,
    crypto_exchange_name: "ftx",
    bitcoin_amount: 0.43854,
    ethereum_amount: 2.234,
    bitcoin_circulating_supply: 56000,
    ethereum_circulating_supply: 456321,
    blockchain_sending_transaction_hash_id_num: "a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d",
    blockchain_receiving_transaction_hash_id_num: "a1062db53e416d8fa109f23b7094a21e5b2645e16c5cf532fc90e4d8fbf5d48d",
    order_status: "processing",
    transaction_date: "2011-01-22T08:00:00.000Z"
    }]

//Delete all seed data and create new object with new seed data
    crypto_exchange.remove({}, (err, data) => {
        //Create new crypto_exchange once old ones are deleted
        crypto_exchange.create(startingcrypto_exchange, (err, data) => {
            console.log(data)
            mongoose.connection.close();
        })
    })
})

