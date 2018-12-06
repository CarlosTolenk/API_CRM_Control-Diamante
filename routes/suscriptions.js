const express = require('express'),
  Suscription = require('../controllers/suscription'),
  apiSuscription = express.Router()

apiSuscription.post('/suscription', Suscription.addSuscription)
apiSuscription.get('/suscriptions', Suscription.getSuscriptions)
apiSuscription.get('/suscription/:id', Suscription.getSuscription)
apiSuscription.delete('/suscription/:id', Suscription.deleteClient)


module.exports = apiSuscription;