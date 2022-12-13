/// creating dependencies and libraries
const express = require("express");
const bcrypt = require("bcryptjs");
/// connecting to the Database Model Schema extracted from the Mongoose Database
const crypto_exchange = require("../model/crypto/crypto_exchange.js");
const ethereum = require("../model/crypto/ethereum.js");
const bitcoin = require("../model/crypto/bitcoin.js");
const { request } = require("http");
const { response } = require("express");

// creating router 
const router = express.Router();

///////////////////////////////
/// Cryptocurrency Display Routes
///////////////////////////////

// Error Handler
function errorHandler(error, res){
    res.json(error)
}

// Crypto Exchange Seed Router
router.get("/seed_crypto_exchange", (request, response) => {

  const startingcrypto_exchange = [{ crypto_exchange_id: 1, 
      bitcoin_id: 1, ethereum_id: null,
      crypto_exchange_name: "binance",
      bitcoin_amount: 1.5, ethereum_amount: null,
      bitcoin_circulating_supply: 1500000, ethereum_circulating_supply: 800321,
      blockchain_sending_transaction_hash_id_num: "a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d",
      blockchain_receiving_transaction_hash_id_num: "a1062db53e416d8fa109f23b7094a21e5b2645e16c5cf532fc90e4d8fbf5d48d",   
      order_status: "complete",
      transaction_date: new Date("2022-05-04")
  },
  { crypto_exchange_id: 2, 
      bitcoin_id: null, ethereum_id: 2,
      crypto_exchange_name: "etoro",
      bitcoin_amount: null, ethereum_amount: 0.09821,
      bitcoin_circulating_supply: 9843284, ethereum_circulating_supply: 12982341,
      blockchain_sending_transaction_hash_id_num: "0xb4bc263278d3ф82a652a8d73a6bfd8ec0ba1a63923bbb4f38147fb8a943da26d",
      blockchain_receiving_transaction_hash_id_num: "a1902dgba3e416d8cr188y11jb01sa21e5b2645e16c5tr666fc10efd8fbf5d48d",   
      order_status: "failed",
      transaction_date: new Date("2021-01-11")
  },
  { crypto_exchange_id: 3, 
      bitcoin_id: 1, ethereum_id: 2,
      crypto_exchange_name:"uphold",
      bitcoin_amount: 1.2, ethereum_amount: 0.764,
      bitcoin_circulating_supply: 9234312, ethereum_circulating_supply: 230098741,
      blockchain_sending_transaction_hash_id_num: "0xb4bc263278e45eu872a2a8d73a6bfd8ec0ba1a63923bbb4f38147fb8a7436asd2",
      blockchain_receiving_transaction_hash_id_num: "e9980df343e418d8cyr58y11jb01sa21e5br6455e16c5tr666fc10efd8fbfg4ert21",   
      order_status: "processing",
      transaction_date: new Date("2022-03-25")
  }]
  
  //Delete all seed data and create new object with new seed data
  crypto_exchange.deleteMany({}, (err, data) => {
      //Create new crypto_exchange once old ones are deleted
      crypto_exchange.create(startingcrypto_exchange, (err, data) => {
              response.json(data)
      })
  })
  })

  // Crypto Ethereum Seed Router
router.get("/seed_ethereum", (request, response) => {
  const startingethereum = [
    {ethereum_id: 1,
        ethereum_name: "Ethereum",
ethereum_price: 1005.98,
ethereum_circulating_supply: "124.5M",
ethereum_cryptocurrency_popularity: 2,
ethereum_marketCap: "$110.5B",
ethereum_price_change_1D: "2.08%",
ethereum_price_change_7D: "7.67%"},
 {ethereum_id: 2,
    ethereum_name: "Ethereum",
    ethereum_price: 954.21,
    ethereum_circulating_supply: "109.9M",
    ethereum_cryptocurrency_popularity: 3,
    ethereum_marketCap: "$150.8B",
    ethereum_price_change_1D: "-0.24%",
    ethereum_price_change_7D: "-3.67%"}]
  
      ethereum.deleteMany({}, (err, data) => {
          //Create new crypto_exchange once old ones are deleted
      ethereum.create(startingethereum, (err, data) => {
              response.json(data)
          })
      })
  })

  // Crypto Ethereum Seed Router
router.get("/seed_bitcoin", (request, response) => {
  const startingbitcoin = [{bitcoin_id: 1,
    bitcoin_name: "Bitcoin",
    bitcoin_price: "1220.58",
bitcoin_circulating_supply: "19.5M",
bitcoin_cryptocurrency_popularity: 1,
bitcoin_marketCap: "$325.5B",
bitcoin_price_change_1D: "0.08%",
bitcoin_price_change_7D: "-1.67%"},
 {bitcoin_id: 2,
    bitcoin_name: "Bitcoin",
    bitcoin_price: "12000.21",
    bitcoin_circulating_supply: "21.9M",
    bitcoin_cryptocurrency_popularity: 1,
    bitcoin_marketCap: "$415.2B",
    bitcoin_price_change_1D: "2.24%",
    bitcoin_price_change_7D: "-16.787%"}]
  
  bitcoin.deleteMany({}, (err, data) => {
              //Create new bitcoin once old ones are deleted
      bitcoin.create(startingbitcoin, (err, data) => {
              response.json(data)
              })
          })
      })

// data display routes
router.get("/crypto_exchange_data", async(request, response) => {
  const crypto_exchange1 = await crypto_exchange.find().catch((error) => errorHandler(error, res))
  response.send({crypto_exchange1})
})
router.get("/bitcoin_data", async(request, response) => {
  const crypto_bitcoin = await bitcoin.find().catch((error) => errorHandler(error, res))
  response.send({crypto_bitcoin})
})
router.get("/ethereum_data", async(request, response) => {
  const crypto_ethereum = await ethereum.find().catch((error) => errorHandler(error, res))
  response.send({ethereum})
})

// home route, checking if server is running (Index)
router.get("/", async(request, response)=>{
  const crypto_ethereum = await ethereum.find().catch((error) => errorHandler(error, res))
  const crypto_bitcoin = await bitcoin.find().catch((error) => errorHandler(error, res))
  const crypto_exchange1 = await crypto_exchange.find().catch((error) => errorHandler(error, res))
  response.render('crypto_index.ejs', {bitcoin: crypto_bitcoin, ethereum: crypto_ethereum, crypto_ex: crypto_exchange1})
})

// NEW route: (New) route for adding new pokemon to pokedex
router.get('/crypto_exchange_new', (request, response)=>{
  response.render("crypto_exchange_new.ejs")
})

// NEW route: (New) route for adding new pokemon to pokedex
router.get('/crypto_bitcoin_new', (request, response)=>{
  response.render("crypto_bitcoin_new.ejs")
})

// NEW route: (New) route for adding new pokemon to pokedex
router.get('/crypto_ethereum_new', (request, response)=>{
  response.render("crypto_ethereum_new.ejs")
})

////////////////// crypto exchange Section ///////////////////////

// crypto exchange coin/token (Show) display route
router.get("/crypto_exchange_show", async(request, response)=>{
  const crypto_exchange1 = await crypto_exchange.find({})
  response.render('crypto_exchange_show.ejs', {crypto_ex: crypto_exchange1})
})

// crypto exchange coin/token (Show) display route
router.get("/crypto_exchange_show/:id", async(request, response)=>{
  const crypto_exchange1 = await crypto_exchange.find({})
  response.render('crypto_exchange_show_2.ejs', {crypto_ex: crypto_exchange1[request.params.id], id: request.params.id})
})

// Destroy ROUTE - (DELETE) - DELETES ONE crypto exchange data instance
router.delete("/crypto_exchange_show", async(request, response) => {
  const id = request.params.id
  const crypto_exchange1 = await crypto_exchange.find({})
  crypto_exchange1.findByIdAndDelete(id, (error, exchange) =>{
    response.redirect(`/`);
  })
});

// (EDIT) Route for editing crypto exchange instance information
router.get("/crypto_exchange_edit/:id", async(request, response)=> {
  const id = request.params.id
  const crypto_exchange1 = await crypto_exchange.find({})
  crypto_exchange1.findById(id, (err, exchange)=> {
    response.render("crypto_exchange_edit.ejs", {crypto_ex: exchange})
  })
})

// (UPDATE) ROUTE - PUT - updates a crypto exchange instance --> adds to the edit page
router.put("/crypto_exchange_show/:id", async(request, response) => {
  const id = request.params.id
  const crypto_exchange1 = await crypto_exchange.find({})
  crypto_exchange1.findByIdAndUpdate(id, request.body, (error, crypto)=>{
    response.redirect("/");
  })
});

// create route - (POST) - CREATES/POSTS a a crypto exchange instance
router.post("/crypto_exchange_show", async(request, response) => {
  const crypto_exchange1 = await crypto_exchange.find({})
  crypto_exchange.create(request.body, (error, crypto)=>{
    response.redirect("/");
  })
});

////////////////// Bitcoin Section ///////////////////////

// crypto exchange coin/token (Show) display route
router.get("/crypto_bitcoin_show", async(request, response)=>{
  const crypto_bitcoin = await bitcoin({})
  response.render('crypto_bitcoin_show.ejs', {bitcoin: crypto_bitcoin})
})

// crypto exchange coin/token (Show) display route
router.get("/crypto_bitcoin_show/:id", async(request, response)=>{
  const crypto_bitcoin = await bitcoin({})
  response.render('crypto_bitcoin_show_2.ejs', {bitcoin: crypto_bitcoin[request.params.id], id: request.params.id})
})

// Destroy ROUTE - (DELETE) - DELETES ONE crypto exchange data instance
router.delete("/crypto_bitcoin_show/:id", async(request, response) => {
  const id = request.params.id
  const crypto_bitcoin = await bitcoin.findByIdAndRemove(id)
  if(crypto_bitcoin){
    response.redirect(`/`);
  }
});

// (EDIT) Route for editing crypto exchange instance information
router.get("/crypto__bitcoin_edit/:id", async(request, response)=> {
  const id = request.params.id
  const crypto_bitcoin = await bitcoin.find({})
  crypto_bitcoin.findById(id, (err, bitcoin)=> {
    response.render("crypto_bitcoin_edit.ejs", {bitcoin: bitcoin})
  })
})

// (UPDATE) ROUTE - PUT - updates a crypto exchange instance --> adds to the edit page
router.put("/crypto_bitcoin_show/:id", async(request, response) => {
  const id = request.params.id
  await bitcoin.findByIdAndUpdate(id, request.body, (error, crypto)=>{
    response.redirect("/");
  })
});

// create route - (POST) - CREATES/POSTS a a crypto exchange instance
router.post("/crypto_bitcoin_show", async(request, response) => {
  const crypto_bitcoin = await bitcoin({})
  crypto_bitcoin.create(request.body, (error, crypto)=>{
    response.redirect("/");
  })
});

////////////////// ethereum Section ///////////////////////

// crypto exchange coin/token (Show) display route
router.get("/crypto_ethereum_show", async(request, response)=>{
  const crypto_ethereum = await ethereum({})
  response.render('crypto_ethereum_show.ejs', {ethereum: crypto_ethereum})
})

// crypto exchange coin/token (Show) display route
router.get("/crypto_ethereum_show/:id", async(request, response)=>{
  const crypto_ethereum = await ethereum({})
  response.render('crypto_ethereum_show_2.ejs', {ethereum: crypto_ethereum[request.params.id], id: request.params.id})
})

// Destroy ROUTE - (DELETE) - DELETES ONE crypto exchange data instance
router.delete("/crypto_ethereum_show/:id", async(request, response) => {
  const id = request.params.id
  const crypto_ethereum = await ethereum.findByIdAndRemove(id)
  if(crypto_ethereum){
    response.redirect(`/`);
  }
});

// (EDIT) Route for editing crypto exchange instance information
router.get("/crypto__ethereum_edit/:id", async(request, response)=> {
  const id = request.params.id
  const crypto_ethereum = await ethereum.find({})
  crypto_ethereum.findById(id, (err, ethereum)=> {
    response.render("crypto_ethereum_edit.ejs", {ethereum: ethereum})
  })
})

// (UPDATE) ROUTE - PUT - updates a crypto exchange instance --> adds to the edit page
router.put("/crypto_ethereum_show/:id", async(request, response) => {
  const id = request.params.id
  await ethereum.findByIdAndUpdate(id, request.body, (error, crypto)=>{
    response.redirect("/");
  })
});

// create route - (POST) - CREATES/POSTS a a crypto exchange instance
router.post("/crypto_ethereum_show", async(request, response) => {
  const crypto_ethereum = await ethereum({})
  crypto_ethereum.create(request.body, (error, crypto)=>{
    response.redirect("/");
  })
});



/*

// crypto ethereum for individual ethereum instance for coin/token (Show) display route
router.get("/crypto_ethereum_show/:id", async(request, response)=>{
    response.render('crypto_ethereum_show_2.ejs', {ethereum: ethereum[request.params.id], id: request.params.id})
})

// Destroy ROUTE - (DELETE) - DELETES ONE crypto ethereum data instance
router.delete("/crypto_ethereum_show/:id", async(request, response) => {
    ethereum.splice(request.params.id, 1); //remove the item from the array
    response.redirect("/"); //redirect back to index route
  });

// (EDIT) Route for editing crypto ethereum instance information
router.get("/crypto_ethereum_edit/:id", async(request, response)=> {
    response.render("crypto_ethereum_edit.ejs", {ethereum: ethereum[request.params.id], id: request.params.id})
})

// (UPDATE) ROUTE - PUT - updates a ethereum instance --> adds to the edit page
router.put("/crypto_ethereum_show/:id", async(request, response) => {
    ethereum[request.params.id] = {...ethereum[request.params.id],...request.body}; 
    response.redirect("/"); //redirect to the index page
  });

// create route - (POST) - CREATES/POSTS a a crypto ethereum instance
router.post("/crypto_ethereum_show", async(request, response) => {
    ethereum.push(request.body);
    response.redirect("/");
  });
*/

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;