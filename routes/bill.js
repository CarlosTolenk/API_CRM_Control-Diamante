const express = require('express'),
  Bill = require('../controllers/bill'),
  apiBill = express.Router()


apiBill.get('/bills', Bill.getBills)
apiBill.get('/bill', Bill.getBill)
apiBill.put('/bill/:id', Bill.putBill)
apiBill.delete('/bill/:id', Bill.deleteBill)


module.exports = apiBill;

