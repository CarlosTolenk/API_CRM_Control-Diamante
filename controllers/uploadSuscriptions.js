const Client = require('../models/client'),
Bill = require('../models/bill'),
Suscription = require('../models/suscription'),
csv = require('fast-csv'),
c = console.log;

let clients = [];
let complete = [];
let incomplete = [];
let total = 0;

const saveClient = (client) => {
    let promise =  new Promise(async (resolve, reject) => {
        await client.save((err, data) => {         
            if(err){                 
                reject(err)
            }
            if(data){                          
               resolve(data)  
            }        
        })  
    });
    return promise;  
}

const saveBill = (billData) => {
    return new Promise(async (resolve, reject) => {
        let 
        


    })
}

const saveSuscription = (suscription) => {

}

const ciclyClient = () =>{ 
    let conteo = 0;
    return new Promise(async(resolve, reject) =>{
         clients.forEach(async(client) => {              
            await saveClient(client)
                .then(() =>{
                    console.log(`SE REGISTRO EL CLIENTE ${client.fullname}`);        
                    complete.push(client);
                    conteo++;  
                    console.log(conteo);
            
                    if(conteo == total){
                        resolve(true)
                    } 
                })
                .catch(() =>{
                    console.log(`NO SE REGISTRO EL CLIENTE ${client.fullname}`);                          
                    incomplete.push(client);
                    conteo++;  
                    console.log(conteo);
            
                    if(conteo == total){
                        resolve(true)
                    } 
                }) 
         });     
 
    });

}

const uploadFile = async (req, res) => {
    total = 0;
    clients = [];
    incomplete = [];
    if (!req.files) return res.status(400).send('No se ha subido el archivo correctamente');
    
    const clientFile = req.files.file;  

    csv
    .fromString(clientFile.data.toString(), {
        headers: true,
        ignoreEmpty: true
    })
    .on("data", function(data){
        total++;
        let formatedClient = {
            fullname: data.fullname,
            cedula: data.cedula,
            movil: data.movil,       
            email: data.email
        }      
        let client = new Client(formatedClient);  
        clients.push(client);
   
    })
    .on("end", async function(){  
        // complete = [];
        // incomplete = [];
      
       ciclyClient()
      .then((resolve) => {
        console.log(`Invocación de los ciclos ${resolve}`)      
        if(resolve){
            res.send({
                count: total,
                total: complete.length + incomplete.length,
                complete_client: complete.length ,
                incomplete_cliente: incomplete.length,
                complete,
                incomplete,
                clients
             });
        }       
      });        
    });
}

module.exports = {
    uploadFile
}


// res.send({
//     count: total,
//     total: complete.length + incomplete.length,
//     complete_client: complete.length ,
//     incomplete_cliente: incomplete.length,
//     complete,
//     incomplete,
//     clients
// });