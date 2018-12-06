const express = require('express'),
  api = express.Router()

api.get('/', async (req, res) => {
  await res.status(200).send({
    message: 'Funcionando API RESTful de CRM Control Diamante con Node.js y MongoDB.'
  })
})

const apiSuscription = require('./suscriptions');
api.use(apiSuscription);

const apiClients = require('./clients');
api.use(apiClients);

const apiBills = require('./bill');
api.use(apiBills);

module.exports = api
