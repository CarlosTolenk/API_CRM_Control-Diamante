const express = require('express'),
  api = express.Router()
  signToken = require('../controllers/signToken');
  

//Home  
api.get('/', async (req, res) => {
  await res.status(200).send({
    message: 'Funcionando API RESTful de CRM Control Diamante con Node.js y MongoDB.'
  })
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

module.exports = api
