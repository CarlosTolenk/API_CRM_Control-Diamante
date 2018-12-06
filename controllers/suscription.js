const Suscription = require('../models/suscription'),
Bill = require('../models/bill'),
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

const apiResponseSave = (res, err, data) => {
  let promise = new Promise((resolve, reject) => {
    if (err) {
      res.status(500).send({
        message: `Error interno del servidor. ${err.message}`
      })
    } else {
      if (data) {
        console.log(`En la funcion de respuesta ${data}`);
        resolve(data)
       
        // return data;  
      } else {
        res.status(404).send({
          message: `No existen datos en el API con tus parámetros de búsqueda.`
        })
      }
    }
  })
  return promise;  
}

const generatedBill = (res,dataBill) => {
  let promise = new Promise( (resolve, reject) =>{    
     let bill = new Bill(dataBill)
     bill.save((err, data) =>{ 
       apiResponseSave(res,err, data)
        .then(result => {
           resolve(result);
        })
    
    })    
  })
  return promise;
}

const getSuscriptions = async (req, res) => {
  await Suscription
    .find({})
    .populate('client payment_method')
    .exec((err, data) => apiResponse(req, res, err, data))
}

const addSuscription = async (req, res) => {
  let billData = {
    amount: req.body.amount,
    referenceName: req.body.referenceName,
    reference: { company: req.body.company, unicode: req.body.unicode}
  };
  // console.log(billData);

  generatedBill(res,billData)
  .then(async (data) => {
    console.log(`La data tiene ${data}`);
    let suscriptionData = {
      name: req.body.name,
      total_message: req.body.total_message,
      current_message: req.body.current_message,
      client: req.body.client,    
      payment_method: data._id,
      at_suscription: new Date()
    };
    let suscription = new Suscription(suscriptionData)
     console.log(suscription);
     await suscription.save((err, data) => apiResponse(req, res, err, data))
  })
 
}

const getSuscription = async (req, res) => {
  await Suscription
    .findById(req.params.id)
    .populate('client payment_method')
    .exec((err, data) => apiResponse(req, res, err, data))
}

const putSuscription = async (req, res) => {
  await Suscription.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, data) => apiResponse(req, res, err, data)
  )
}

const deleteClient = async (req, res) => {
  await Suscription.findByIdAndRemove(
    req.params.id,
    (err, data) => apiResponse(req, res, err, data)
  )
}


module.exports = {
  getSuscriptions,
  addSuscription,
  getSuscription,
  putSuscription,
  deleteClient
}
