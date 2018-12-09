const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  SuscriptionSchema = new Schema({
    name: {
      type: String,
      required: [true, 'El nombre del plan es requerido'],     
    },
    total_message: {
      type: Number,   
      required: [true, 'El total de mensaje del plan es requerido'],     
    },
    current_message: {
      type: Number,   
    },   
    payment_method: {
      type: Schema.Types.ObjectId,
      ref: 'Bill',     
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: 'Client',      
    },
    status: {
      type: String,   
      enum: ['Activo', 'Pendiente', 'Completado', 'Declinado'],
      default: 'Activo'
    },
    note: {
      type: String     
    },
    at_update:{
      type: Date     
    },
    at_suscription: {
      type: Date,   
    },
    token: {
      type: String,   
    },
  })

//mongodb va a pluralizar y poner en minúsculas el modelo
module.exports = mongoose.model('Suscription', SuscriptionSchema)
