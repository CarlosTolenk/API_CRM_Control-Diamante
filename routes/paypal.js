const express = require('express'),
  Paypal = require('../controllers/paymente-paypal'),
  middlewares = require('../middlewares/auth'),
  apiBillPaypal = express.Router();

  apiBillPaypal.get('/payment-paypal',  Paypal.createPayment);
  apiBillPaypal.post('/register-payment', Paypal.registerPayment);
  apiBillPaypal.get('/success-paypal',  Paypal.successPayment);
  apiBillPaypal.get('/cancel-paypal',  Paypal.cancelPayment);
  apiBillPaypal.get('/get-payment-paypal', Paypal.getBillsPaypal);

  apiBillPaypal.post('/get-payment-paypal-term', Paypal.getBillByTerm);
  apiBillPaypal.put('/put-payment-paypal/:id', Paypal.activePaypal);
  apiBillPaypal.post('/get-payment-paypal-where', Paypal.whereDatePaypal);
  apiBillPaypal.get('/success-view',  Paypal.successView);  



module.exports = apiBillPaypal;

