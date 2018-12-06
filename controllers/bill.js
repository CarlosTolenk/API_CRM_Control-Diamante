const Bill = require('../models/bill'),
  c = console.log

const apiResponse = (req, res, err, data) => {
  if (err) {
    res.status(500).send({
      message: `Error interno del servidor. ${err.message}`
    })
  } else {
    if (data) {
      res.status(200).send({ data })
    } else {
      res.status(404).send({
        message: `No existen datos en el API con tus parámetros de búsqueda.`
      })
    }
  }
}

const getBills = async (req, res) => {
  await Bill
    .find({})
    .exec((err, data) => apiResponse(req, res, err, data))
}

const getBill = async (req, res) => {
  await Bill
    .findById(req.params.id)
    .exec((err, data) => apiResponse(req, res, err, data))
}

const putBill = async (req, res) => {
  await Bill
  .findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, data) => apiResponse(req, res, err, data)
  )
}

const deleteBill = async (req, res) => {
  await Bill
  .findByIdAndRemove(
    req.params.id,
    (err, data) => apiResponse(req, res, err, data)
  )
}

module.exports = {
  getBills, 
  getBill,
  putBill,
  deleteBill
}
