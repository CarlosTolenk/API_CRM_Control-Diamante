const express = require('express'),
  api = express.Router()
  signToken = require('../controllers/signToken');
  

//Home  
api.get('/', async (req, res) => {
     await res.render("index");
})

api.post('/authorization', signToken.createToken);

//Routes and Controllers
const apiSuscription = require('./suscriptions');
api.use(apiSuscription);

const apiClients = require('./clients');
api.use(apiClients);

const apiBills = require('./bill');
api.use(apiBills);

const apiSMS = require('./send_sms');
api.use(apiSMS);

const apiPaypal = require('./paypal');
api.use(apiPaypal);

module.exports = api
