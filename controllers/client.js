const Client = require('../models/client'),
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

const getClients = async (req, res) => {
  await Client
    .find({})
    .sort({ 'fullname': 1 })
    .exec((err, data) => apiResponse(req, res, err, data))
}

const addClient = async (req, res) => {
  let client = new Client(req.body)
  c(req.body)
  await client.save((err, data) => apiResponse(req, res, err, data))
}

const getClient = async (req, res) => {
  await Client
    .findById(req.params.id)
    .exec((err, data) => apiResponse(req, res, err, data))
}

const getClientCedula = async (req, res) => {
  let client = new Client(req.body);
  await Client
    .find({ $or: [
      { 'cedula': client.cedula },
      { 'movil': client.movil },

    ]})
    .exec((err, data) => apiResponse(req, res, err, data))
}

const putClient = async (req, res) => {
  await Client.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, data) => apiResponse(req, res, err, data)
  )
}

const deleteClient = async (req, res) => {
  await Client.findByIdAndRemove(
    req.params.id,
    (err, data) => apiResponse(req, res, err, data)
  )
}

module.exports = {
  getClients,
  addClient,
  getClient,
  getClientCedula,
  putClient,
  deleteClient
}
