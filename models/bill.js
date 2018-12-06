const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  BillSchema = new Schema({
    amount: {
        type: Number,   
    },  
    referenceName: {
        type: String,   
    },
    reference: [{
         company: String,
         unicode: String
    }],
    approval: {
      type: String,     
      enum: ['Aprobado', 'Declinado'],
      default: 'Aprobado'
    }   
  })

//mongodb va a pluralizar y poner en minúsculas el modelo
module.exports = mongoose.model('Bill', BillSchema)
