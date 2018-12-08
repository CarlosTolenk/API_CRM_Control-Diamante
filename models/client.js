const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ClientSchema = new Schema({
    fullname: {
      type: String,
      required: [true, 'El nombre completo del cliente es requerido']
    },
    cedula: {
      type: String,     
      required: [true, 'La cédula electoral del cliente es requerida'],
  
    },
    movil: {
      type: String,
      required: [true, 'El número de móvil del cliente es requerido '],
      unique: true   
    },
    at_created: {
      type: Date, 
      default: Date.now
    },
    email: {
      type: String,
      lowercase: true,
      unique: true

    }
  })

//mongodb va a pluralizar y poner en minúsculas el modelo
module.exports = mongoose.model('Client', ClientSchema)
