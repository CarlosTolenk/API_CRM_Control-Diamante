const Client = require('../models/client'),
csv = require('fast-csv'),
c = console.log;

let complete = [];
let incomplete = [];
let total = 0;

const saveClient = async (client) => {
   await client.save((err, data) => {
        if(err){
            // return(false)
            console.log(`Error del servidor: ${err}`)
            incomplete.push(client);        
        }
        if(data){
            // return(true)           
            console.log(`Creado el cliente: ${client}`)
            complete.push(client);
        }
       
    })
}

const uploadFile = async (req, res) => {
    complete = [];
    incomplete = [];
    total = 0;

    if (!req.files) return res.status(400).send('No se ha subido el archivo correctamente');
    
    const clientFile = req.files.file;  

    csv
    .fromString(clientFile.data.toString(), {
        headers: true,
        ignoreEmpty: true
    })
    .on("data", async function(data){
        let formatedClient = {
            fullname: data.fullname,
            cedula: data.cedula,
            movil: data.movil,       
            email: data.email
        }      
        let client = new Client(formatedClient); 
        console.log(client);
        await saveClient(client)
        .then((resul) => {
            if(resul){             
                console.log(`Creado el cliente: ${data}`)
                total++; 
                console.log("Cliente procesado");
            }else{              
                console.log("Cliente ya ha sido creado con anterioridad");
            }           
        })     
    })
    .on("end", function(){  
        console.log("done" + total);
        res.send({
            total: `${complete.length + incomplete.length}`,
            complete_client: complete.length ,
            incomplete_cliente: incomplete.length,
            complete,
            incomplete,
        });
    });
}

module.exports = {
    uploadFile
}
