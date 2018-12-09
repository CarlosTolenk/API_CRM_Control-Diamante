const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  MessageSchema = new Schema({
    number: {
        type: String,   
    },  
    client: {
        type: String,   
    },
    plan: {
         type: String 
    },
    body:{
        type: String 
    },
    send_message: {
        type: Date, 
        default: Date.now
      },
  })

//mongodb va a pluralizar y poner en minúsculas el modelo
module.exports = mongoose.model('Message', MessageSchema)