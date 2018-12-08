const express = require('express'),
  Client = require('../controllers/client'),
  // UploadCsvLoad = require('../controllers/uploadClients'),
  UploadCsvLoad = require('../controllers/uploadSuscriptions'),
  middlewares = require('../middlewares/auth'),
  apiClient = express.Router()


// CRUD
apiClient.get('/clients', middlewares.ensureAuthenticated, Client.getClients)
apiClient.post('/add-client', middlewares.ensureAuthenticated, Client.addClient)
apiClient.get('/client/:id', middlewares.ensureAuthenticated, Client.getClient)
apiClient.get('/client-cedula',middlewares.ensureAuthenticated, Client.getClientCedula)
apiClient.put('/client/:id', middlewares.ensureAuthenticated, Client.putClient)
apiClient.delete('/client/:id',middlewares.ensureAuthenticated, Client.deleteClient)

//Upload Cvs to Json
apiClient.post('/upload-clients',middlewares.ensureAuthenticated, UploadCsvLoad.uploadFile)


module.exports = apiClient;