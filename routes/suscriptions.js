const express = require('express'),
  Suscription = require('../controllers/suscription'),
  middlewares = require('../middlewares/auth'),
  apiSuscription = express.Router()

apiSuscription.post('/suscription', middlewares.ensureAuthenticated, Suscription.addSuscription)
apiSuscription.get('/suscriptions', middlewares.ensureAuthenticated, Suscription.getSuscriptions)
apiSuscription.get('/suscription/:id', middlewares.ensureAuthenticated, Suscription.getSuscription)
apiSuscription.put('/suscription/:id', middlewares.ensureAuthenticated, Suscription.putSuscription)
apiSuscription.delete('/suscription/:id', middlewares.ensureAuthenticated, Suscription.deleteClient)


module.exports = apiSuscription;