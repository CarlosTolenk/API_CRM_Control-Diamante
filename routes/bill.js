const express = require('express'),
  Bill = require('../controllers/bill'),
  apiBill = express.Router(),
  middlewares = require('../middlewares/auth');


apiBill.get('/bills', middlewares.ensureAuthenticatedShift, Bill.getBills)
apiBill.get('/bill/:id', middlewares.ensureAuthenticatedShift, Bill.getBill)
apiBill.put('/bill/:id', middlewares.ensureAuthenticatedShift, Bill.putBill)
apiBill.delete('/bill/:id', middlewares.ensureAuthenticatedShift, Bill.deleteBill)


module.exports = apiBill;

