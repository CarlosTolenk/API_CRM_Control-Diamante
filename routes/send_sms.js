const express = require('express'),
  SMS_Send = require('../controllers/message_sms'),
  // UploadCsvLoad = require('../controllers/uploadClients'),

  middlewares = require('../middlewares/auth'),
  apiMessageSMS = express.Router()


// CRUD
apiMessageSMS.post('/send-sms', SMS_Send.sendMessages)
apiMessageSMS.get('/get-sms', SMS_Send.getMessages)
apiMessageSMS.post('/send-sms-only', SMS_Send.sendMessageOnly)


module.exports = apiMessageSMS;