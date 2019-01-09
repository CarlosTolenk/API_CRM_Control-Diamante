const express = require('express'),
  Paypal = require('../controllers/paymente-paypal'),
  apiBillPaypal = express.Router();



  apiBillPaypal.get('/payment-paypal',  Paypal.createPayment);
  apiBillPaypal.post('/register-payment', Paypal.registerPayment);
  apiBillPaypal.get('/success-paypal',  Paypal.successPayment);
  apiBillPaypal.get('/cancel-paypal',  Paypal.cancelPayment);
  apiBillPaypal.get('/get-payment-paypal',  Paypal.getBillPaypal);








module.exports = apiBillPaypal;

