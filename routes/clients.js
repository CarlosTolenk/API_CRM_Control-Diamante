const express = require('express'),
  Client = require('../controllers/client'),
  UploadCsvLoad = require('../controllers/uploadClients'),
  apiClient = express.Router()


// CRUD
apiClient.get('/clients', Client.getClients)
apiClient.post('/add-client', Client.addClient)
apiClient.get('/client/:id', Client.getClient)
apiClient.get('/client-cedula', Client.getClientCedula)
apiClient.put('/client/:id', Client.putClient)
apiClient.delete('/client/:id', Client.deleteClient)

//Upload Cvs to Json
apiClient.post('/upload-clients', UploadCsvLoad.uploadFile)


module.exports = apiClient;