/// creating dependencies and libraries
const express = require("express");
const bcrypt = require("bcryptjs");
/// connecting to the Database Model Schema extracted from the Mongoose Database
const {crypto_exchange, crypto_bitcoin, crypto_ethereum}  = require("../model/crypto/crypto_exchange");
const { request } = require("http");
const { response } = require("express");

// creating router 
const router = express.Router();

///////////////////////////////
/// Cryptocurrency Display Routes
///////////////////////////////

/*
// login page route
router.use((request, response, next)=>{
  console.log(request.body, request.query, request.session)
  if(request.session.loggedIn){
    next()
  }
  else{
    response.redirect("user/User_Login")
  }
})
*/

// Error Handler
function errorHandler(error, res){
    res.json(error)
}

// database array
var crypto_exchange_array = [];
// crypto_exchange_array.push(d.bitcoin_id)
// const crypto_exchange1 = await crypto_exchange.find({}).then(data1 => {
// data1.map((d, k) => { console.log(d)}) })
  //const crypto_bitcoin1 = await crypto_bitcoin.find({}).then(data1 => {
  // response.render('crypto_index.ejs', {crypto_ex: crypto_exchange1})
//})

// home route, checking if server is running (Index)
router.get("/", async(request, response)=>{
  const crypto_exchange1 = await crypto_exchange.find({}).catch((error) => errorHandler(error, response))
  const crypto_bitcoin1 = await crypto_bitcoin.find({}).catch((error) => errorHandler(error, response))
  const crypto_ethereum1 = await crypto_ethereum.find({}).catch((error) => errorHandler(error, response))
  response.render('crypto_index.ejs', {bitcoin: crypto_bitcoin1, ethereum: crypto_ethereum1, crypto_ex: crypto_exchange1})
})


////////////////// crypto exchange Section ///////////////////////

// crypto Exchange data display routes
router.get("/crypto_exchange_data", async(request, response) => {
  const crypto_exchange1 = await crypto_exchange.find({}).catch((error) => errorHandler(error, response))
  response.send({crypto_exchange1})
})

router.get("/crypto_bitcoin_data", async(request, response) => {
  const crypto_bitcoin1 = await crypto_bitcoin.find({}).catch((error) => errorHandler(error, response))
  response.send({crypto_bitcoin1})
})

router.get("/crypto_ethereum_data", async(request, response) => {
  const crypto_ethereum1 = await crypto_ethereum.find({}).catch((error) => errorHandler(error, response))
  response.send({crypto_ethereum1})
})

// NEW route: (New) route for adding new entries for Bitcoin, Ethereum, Crypto Exchange instance(s)
router.get('/crypto_exchange_new', (request, response)=>{
  response.render("crypto_exchange_new.ejs")
})
router.get('/crypto_bitcoin_new', (request, response)=>{
  response.render("crypto_bitcoin_new.ejs")
})
router.get('/crypto_ethereum_new', (request, response)=>{
  response.render("crypto_ethereum_new.ejs")
})

// Destroy ROUTE (D) - (DELETE) - DELETES ONE crypto exchange data instance
router.delete("/crypto_exchange_show/:id/:mongoose_id", async(request, response) => {
  const id = request.params.id
  const mongo_db_num = request.params.mongoose_id
  const exchange = await crypto_exchange.find({}).catch((error) => errorHandler(error,response))
  const deleted = await crypto_exchange.findByIdAndDelete(exchange[id].id)
  if(deleted){
    response.redirect("/")
  }
});

// PUT ROUTE (U) - (UPDATE) - updates a crypto exchange instance --> adds to the edit page
router.put("/crypto_exchange_show/:id/:mongoose_id", async(request, response) => {
  const id = request.params.id
  const mongo_db_num = request.params.mongoose_id
  const exchange = await crypto_exchange.find({}).catch((error) => errorHandler(error,response))
  //await crypto_exchange.findByIdAndUpdate(exchange[id].id, request.body, { new: true }, (error, crypto)=>{
  await crypto_exchange.findByIdAndUpdate(exchange[id].id, request.body).catch((error) => errorHandler(error,response))
  response.redirect("/");
  });

// create route (C) - (POST) - CREATES/POSTS a a crypto exchange instance
router.post("/crypto_exchange_show", async(request, response) => {
  const crypto_exchange1 = await crypto_exchange.find({}).catch((error) => errorHandler(error, response))
  await crypto_exchange.create(request.body, (error, crypto)=>{
    response.redirect("/");
  })
});

/// Work on things here and work on getting the code fixed
// (EDIT) Route for editing crypto exchange instance information
router.get("/crypto_exchange_edit/:id/:mongoose_id", async(request, response)=> {
  const id = request.params.id
  const mongo_db_num = request.params.mongoose_id
  const exchange = await crypto_exchange.find({}).catch((error) => errorHandler(error,response))
  const ex_id = await crypto_exchange.findById(exchange[id]._id).catch((error) => errorHandler(error,response))
  console.log(ex_id)
  response.render("crypto_exchange_edit.ejs", {crypto_ex: ex_id, id: request.params.id, mongo_db_id: request.params.mongoose_id})
})

//  (Show) crypto exchange coin/token (R) - Read display first route
router.get("/crypto_exchange_show", async(request, response)=>{
  response.render('crypto_exchange_show.ejs', {crypto_ex: await crypto_exchange.find({}).catch((error) => errorHandler(error, response))})
})

// (Show) crypto exchange coin/token (R) - Read display second route
router.get("/crypto_exchange_show/:id/:mongoose_id", async(request, response)=>{
  const crypto_exchange1 = await crypto_exchange.find({}).catch((error) => errorHandler(error, response))
  response.render('crypto_exchange_show_2.ejs', {crypto_ex: crypto_exchange1[request.params.id], id: request.params.id, mongo_db_id: request.params.mongoose_id})
})


router.get("/crypto_exchange_edit/:id/:mongoose_id", async(request, response)=> {
  const id = request.params.id
  const mongo_db_num = request.params.mongoose_id
  const exchange = await crypto_exchange.find({}).catch((error) => errorHandler(error,response))
  const ex_id = await crypto_exchange.findById(exchange[id]._id).catch((error) => errorHandler(error,response))
  console.log(ex_id)
  response.render("crypto_exchange_edit.ejs", {crypto_ex: ex_id, id: request.params.id, mongo_db_id: request.params.mongoose_id})
})


////////////////// Bitcoin Section ///////////////////////

// Destroy ROUTE (D) - (DELETE) - DELETES ONE crypto exchange data instance
router.delete("/crypto_bitcoin_show/:id/:mongoose_id", async(request, response) => {
  const id = request.params.id
  const mongo_db_num = request.params.mongoose_id
  const bitcoin = await crypto_bitcoin.find({}).catch((error) => errorHandler(error,response))
  const deleted = await crypto_bitcoin.findByIdAndDelete(bitcoin[id].id)
  if(deleted){
    response.redirect("/")
  }
});

// PUT ROUTE (U) - (UPDATE) - updates a crypto bitcoin instance --> adds to the edit page
router.put("/crypto_bitcoin_show/:id/:mongoose_id", async(request, response) => {
  const id = request.params.id
  const mongo_db_num = request.params.mongoose_id
  const bitcoin = await crypto_bitcoin.find({}).catch((error) => errorHandler(error,response))
  //await crypto_bitcoin.findByIdAndUpdate(bitcoin[id].id, request.body, { new: true }, (error, crypto)=>{
  await crypto_bitcoin.findByIdAndUpdate(bitcoin[id].id, request.body).catch((error) => errorHandler(error,response))
  response.redirect("/");
  });

// create route (C) - (POST) - CREATES/POSTS a a crypto bitcoin instance
router.post("/crypto_bitcoin_show", async(request, response) => {
  const crypto_bitcoin1 = await crypto_bitcoin.find({}).catch((error) => errorHandler(error, response))
  await crypto_bitcoin.create(request.body, (error, crypto)=>{
    response.redirect("/");
  })
});

/// Work on things here and work on getting the code fixed
// (EDIT) Route for editing crypto bitcoin instance information
router.get("/crypto_bitcoin_edit/:id/:mongoose_id", async(request, response)=> {
  const id = request.params.id
  const mongo_db_num = request.params.mongoose_id
  const bitcoin = await crypto_bitcoin.find({}).catch((error) => errorHandler(error,response))
  const ex_id = await crypto_bitcoin.findById(bitcoin[id]._id).catch((error) => errorHandler(error,response))
  console.log(ex_id)
  response.render("crypto_bitcoin_edit.ejs", {crypto_ex: ex_id, id: request.params.id, mongo_db_id: request.params.mongoose_id})
})

//  (Show) crypto bitcoin coin/token (R) - Read display first route
router.get("/crypto_bitcoin_show", async(request, response)=>{
  response.render('crypto_bitcoin_show.ejs', {bitcoin: await crypto_bitcoin.find({}).catch((error) => errorHandler(error, response))})
})

// (Show) crypto bitcoin coin/token (R) - Read display second route
router.get("/crypto_bitcoin_show/:id/:mongoose_id", async(request, response)=>{
  const crypto_bitcoin1 = await crypto_bitcoin.find({}).catch((error) => errorHandler(error, response))
  response.render('crypto_bitcoin_show_2.ejs', {bitcoin: crypto_bitcoin1[request.params.id], id: request.params.id, mongo_db_id: request.params.mongoose_id})
})


// get rid of this one here
router.get("/show/:id/:mongoose_id", async(request, response)=> {
  const id_num = request.params.id
  const mongo_db_num = request.params.mongoose_id
  const bitcoin = await crypto_bitcoin.find({}).catch((error) => errorHandler(error,response))
  const ex_id = await crypto_bitcoin.findById(bitcoin[id_num]).catch((error) => errorHandler(error,response))
  const mongo_id = "639bfafbe7a2bfa17ac40faf"
  // response.render("crypto_bitcoin_edit copy.ejs", {crypto_ex: ex_id, id: request.params.id, mongo_db_id: request.params.mongoose_id})
  console.log(ex_id, request.body)
})

router.get("/edit/:id/:mongoose_id", async(request, response)=> {
  const id = request.params.id
  const mongo_db_num = request.params.mongoose_id
  const bitcoin = await crypto_bitcoin.find({}).catch((error) => errorHandler(error,response))
  const ex_id = await crypto_bitcoin.findById(bitcoin[id]._id).catch((error) => errorHandler(error,response))
  console.log(ex_id)
  response.render("crypto_bitcoin_edit.ejs", {crypto_ex: ex_id, id: request.params.id, mongo_db_id: request.params.mongoose_id})
})

////////////////// ethereum Section ///////////////////////

// Destroy ROUTE (D) - (DELETE) - DELETES ONE crypto exchange data instance
router.delete("/crypto_ethereum_show/:id/:mongoose_id", async(request, response) => {
  const id = request.params.id
  const mongo_db_num = request.params.mongoose_id
  const ethereum = await crypto_ethereum.find({}).catch((error) => errorHandler(error,response))
  const deleted = await crypto_ethereum.findByIdAndDelete(ethereum[id].id)
  if(deleted){
    response.redirect("/")
  }
});

// PUT ROUTE (U) - (UPDATE) - updates a crypto ethereum instance --> adds to the edit page
router.put("/crypto_ethereum_show/:id/:mongoose_id", async(request, response) => {
  const id = request.params.id
  const mongo_db_num = request.params.mongoose_id
  const ethereum = await crypto_ethereum.find({}).catch((error) => errorHandler(error,response))
  //await crypto_ethereum.findByIdAndUpdate(ethereum[id].id, request.body, { new: true }, (error, crypto)=>{
  await crypto_ethereum.findByIdAndUpdate(ethereum[id].id, request.body).catch((error) => errorHandler(error,response))
  response.redirect("/");
  });

// create route (C) - (POST) - CREATES/POSTS a a crypto ethereum instance
router.post("/crypto_ethereum_show", async(request, response) => {
  const crypto_ethereum1 = await crypto_ethereum.find({}).catch((error) => errorHandler(error, response))
  await crypto_ethereum.create(request.body, (error, crypto)=>{
    response.redirect("/");
  })
});

/// Work on things here and work on getting the code fixed
// (EDIT) Route for editing crypto ethereum instance information
router.get("/crypto_ethereum_edit/:id/:mongoose_id", async(request, response)=> {
  const id = request.params.id
  const mongo_db_num = request.params.mongoose_id
  const ethereum = await crypto_ethereum.find({}).catch((error) => errorHandler(error,response))
  const ex_id = await crypto_ethereum.findById(ethereum[id]._id).catch((error) => errorHandler(error,response))
  console.log(ex_id)
  response.render("crypto_ethereum_edit.ejs", {crypto_ex: ex_id, id: request.params.id, mongo_db_id: request.params.mongoose_id})
})

//  (Show) crypto ethereum coin/token (R) - Read display first route
router.get("/crypto_ethereum_show", async(request, response)=>{
  response.render('crypto_ethereum_show.ejs', {ethereum: await crypto_ethereum.find({}).catch((error) => errorHandler(error, response))})
})

// (Show) crypto ethereum coin/token (R) - Read display second route
router.get("/crypto_ethereum_show/:id/:mongoose_id", async(request, response)=>{
  const crypto_ethereum1 = await crypto_ethereum.find({}).catch((error) => errorHandler(error, response))
  response.render('crypto_ethereum_show_2.ejs', {ethereum: crypto_ethereum1[request.params.id], id: request.params.id, mongo_db_id: request.params.mongoose_id})
})

router.get("/edit/:id/:mongoose_id", async(request, response)=> {
  const id = request.params.id
  const mongo_db_num = request.params.mongoose_id
  const ethereum = await crypto_ethereum.find({}).catch((error) => errorHandler(error,response))
  const ex_id = await crypto_ethereum.findById(ethereum[id]._id).catch((error) => errorHandler(error,response))
  console.log(ex_id)
  response.render("crypto_ethereum_edit.ejs", {crypto_ex: ex_id, id: request.params.id, mongo_db_id: request.params.mongoose_id})
})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;