const csv = require('fast-csv'),
Message = require('../models/message'),
c = console.log,
config = require('../config')


let clients = [];
let sendClient = [];
let noSendClient = [];
let total = 0;
  
const sendMessages = (req, res) => {
    total = 0;
    clients = [];
  
    if (!req.files) return res.status(400).send('No se ha subido el archivo correctamente');
    
    const clientFile = req.files.file;   
    const bodyText = req.body.body;
    const plan = req.body.plan;

    csv
    .fromString(clientFile.data.toString(), {
        headers: true,
        ignoreEmpty: true
    })
    .on("data", async function(data){
        console.log("Ejectuando...");        
        total++;
        let formatedMessage = {
          number: data.numero,
          client: data.cliente,
          plan,
          body: bodyText
        }    
         clients.push(formatedMessage);
         console.log(total);
   
    })
    .on("end", async function(){   
        await ciclyClient();
        res.status(200).send({
            count: total,       
            sendClient,
            noSendClient
            });
         });
}

const sendMessageOnly = async (req, res) => {
    const formatedMessage = {
        number: req.body.number,
        client: req.body.client,
        plan: req.body.plan,
        body: req.body.body
    }

    constructorMessage(formatedMessage)
    .then(()=>{
        message = new Message(formatedMessage);
        saveMessage(message)
        .then((data)=>{
            res.status(200).send({
             message: 'Correcto',
             data
          })
        }) 
    })
}




const getMessages = async (req, res) => {
    await Message
    .find({})
    .sort({ 'send_message': -1 })
    .exec((err, data) => apiResponse(req, res, err, data))
}

  const ciclyClient = () => { 
    let conteo = 0;
    return new Promise( async (resolve, reject) => {
         clients.forEach(async(client) => {              
            constructorMessage(client)
                .then(async () => {                                  
                    let formated = {
                        number: client.number,
                        client: client.client,
                        plan: client.plan,
                        body: client.body                       
                    }
                    let message = new Message(formated);
                    console.log(message);
                    conteo++;    
                    console.log(conteo);

                    saveMessage(message)
                    .then(async(data) =>{          
                       await sendClient.push(data);                                   
                        if(conteo >= total){                                                    
                            resolve(true)
                        }  
                    });    
                    // .catch((data)=>{
                    //     console.log(data);
                    //     reject(false)
                    // })                     
                });           
         });     
 
    });
}

const saveMessage = (message) => {
    return new Promise(async (resolve, reject) => {
        await message.save((err, data) =>{
            if (err) noSendClient.push(err)
            if(data){
                console.log(`Se guardo el SMS enviado para el historial ${data}`)
                resolve(data)
            }else{
                console.log("No se ha creado");
                reject(data);
            }
       })
    })
}

const constructorMessage = (send) => {
    return new Promise((resolve, reject) => {
    const accountSid = process.env.ACCOUNT_SID_TWILIO;
    const authToken = process.env.AUTH_TOKEN_TWILIO;
    const client = require('twilio')(accountSid, authToken);

    client.messages
    .create({
        body: `
        CONTROL DIAMANTE.
${send.client} gracias por ingresar a nuestro PLAN: ${send.plan}  /--/  ${send.body}
`,
        from: process.env.NUMBER_FROM_TWILIO,
        to: send.number
    })
    .then(message =>{
        console.log(message.sid);
        resolve(true)
    })
    .done((data)=>{
        console.log(`Se termino de enviar todo ${data}`)
        resolve(true)
      });
    })  
}

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
  

  module.exports = {
    sendMessages,
    getMessages,
    sendMessageOnly
  }
  



