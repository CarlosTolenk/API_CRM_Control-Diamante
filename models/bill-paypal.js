const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  PaypalSchema = new Schema({
    amount: {
        type: Number,   
    },  
    suscription: {
        type: String,   
    },
    client:{
        type: String,
    },
    cedula:{
        type: String,
    },
    movil:{
        type: String,
    },
    identificacion:{
        type: String,
    },
    date:{
        type: Date, 
        default: Date.now
    },
    sku:{
        type: String
    }
  })

//mongodb va a pluralizar y poner en minúsculas el modelo
module.exports = mongoose.model('PaypalBill', PaypalSchema)