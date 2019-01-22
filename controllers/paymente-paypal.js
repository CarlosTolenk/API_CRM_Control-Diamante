const Paypal = require('../models/bill-paypal');
const paypalSDK = require("paypal-rest-sdk");
const mongoosePaginate = require('mongoose-paginate');
const moment = require('moment');
const c = console.log;
const axios = require('axios');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const dateFormat = require('dateformat');

let usd_dop = 0;
let InfoPay = {};

paypalSDK.configure({
    mode: "live", //sandbox or live
    client_id: process.env.CLIENT_PAYPAL_ID,
    client_secret: process.env.CLIENT_PAYPAL_SECRET
});


const sendEmail = (payload) => {
    console.log('Enviando el mensaje');
    let fecha = new Date(InfoPay.date);
    let fechaIso = dateFormat(fecha, "isoDate");
    console.log(fechaIso)

    let transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: 'inscripcionescontroldiamante@gmail.com',
          pass: 'tumama!1234'
        }
      }));

      if(InfoPay.cedula && !InfoPay.identificacion){
        let mailOptions = {        
            from: 'inscripcionescontroldiamante@gmail.com',
            to: 'carlos.tolentinoe@gmail.com',
            // to: 'inscripcionescontroldiamante@gmail.com',
            subject: `${InfoPay.movil}`,
            text:'Información del plan/evento comprado',
            html: `
            <h4>Nombre del Cliente: <small>${InfoPay.client}</small></h4>
            <h4>Móvil: <small>${InfoPay.movil}</small></h4>
            <h4>Suscripción: <small>${InfoPay.suscription}</small></h4>
            <h4>Monto Pagado: <small>${InfoPay.amount}</small></h4>      
            <h4>Cédula: <small>${InfoPay.cedula}</small></h4>      
            <h4>Fecha: <small>${fechaIso}</small></h4>
            <h4>Sku: <small>${InfoPay.sku}</small></h4>
            ${payload}
            `
          };


            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });  
      }

      if(!InfoPay.cedula && InfoPay.identificacion){
        let mailOptions = {        
            from: 'inscripcionescontroldiamante@gmail.com',
            to: 'carlos.tolentinoe@gmail.com',
            // to: 'inscripcionescontroldiamante@gmail.com',
            subject: `${InfoPay.movil}`,
            text:'Información del plan/evento comprado',
            html: `
            <h4>Nombre del Cliente: <small>${InfoPay.client}</small></h4>
            <h4>Móvil: <small>${InfoPay.movil}</small></h4>
            <h4>Suscripción: <small>${InfoPay.suscription}</small></h4>
            <h4>Monto Pagado: <small>${InfoPay.amount}</small></h4>       
            <h4>Identificación: <small>${InfoPay.identificacion}</small></h4>   
            <h4>Fecha: <small>${fechaIso}</small></h4>
            <h4>Sku: <small>${InfoPay.sku}</small></h4>
            ${payload}
            `
          };


            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });  
      }

      if(InfoPay.cedula && InfoPay.identificacion){
        let mailOptions = {        
            from: 'inscripcionescontroldiamante@gmail.com',
            to: 'carlos.tolentinoe@gmail.com',
            // to: 'inscripcionescontroldiamante@gmail.com',
            subject: `${InfoPay.movil}`,
            text:'Información del plan/evento comprado',
            html: `
            <h4>Nombre del Cliente: <small>${InfoPay.client}</small></h4>
            <h4>Móvil: <small>${InfoPay.movil}</small></h4>
            <h4>Suscripción: <small>${InfoPay.suscription}</small></h4>
            <h4>Monto Pagado: <small>${InfoPay.amount}</small></h4>      
            <h4>Cédula: <small>${InfoPay.cedula}</small></h4>      
            <h4>Identificación: <small>${InfoPay.identificacion}</small></h4>   
            <h4>Fecha: <small>${fechaIso}</small></h4>
            <h4>Sku: <small>${InfoPay.sku}</small></h4>
            ${payload}
            `
          };


            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });  
      }

    


      
    
  
    

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

const apiResponseV2 = (req, res, err, data, count, page_num, page_size) => {
    if (err) {
      res.status(500).send({
        message: `Error interno del servidor. ${err.message}`
      })
    } else {
      if (data) {
        res.status(200).send({ 
            result: {
                data,
                count,
                page_num, 
                page_size
            }
         })
      } else {
        res.status(404).send({
          message: `No existen datos en el API con tus parámetros de búsqueda.`
        })
      }
    }
}

const getCurrency = async () => {
    try {
      return await axios.get('http://data.fixer.io/api/latest?access_key=fc0a81fc3ec1e55552d5e78d296a496d&format=1')
    } catch (error) {
      console.error(`EL ERROR ES EN LA API ${error}`)
    }
  }



const registerPayment =  async (req, res) => { 
    let payment = new Paypal(req.body);    
    InfoPay = payment;  
    console.log(InfoPay);


    const dolar = getCurrency()
        .then(response => {
    
            let DOPE = response.data.rates.DOP;
            let USDE = response.data.rates.USD;
            console.log(`DOP:${DOPE} USD: ${USDE}`)
            // usd_dop = payment.amount / response.data.USD_DOP.val  
            usd_dop = (USDE / DOPE) * payment.amount;
            payment.
            console.log(`EL Dolar: ${usd_dop}`);  
            res.send({
                status: 'OK',                
            })
            // res.redirect(`${process.env.URL_API}}payment-paypal`);
        })
        .catch((err) => {
            console.log(err);
            res.send({
                status: err,                
            })
        }) 
  
}

const cancelPayment = async (req, res) => {
    res.render("cancel");
}  

const successView = async (req, res) => {
    res.render("success");
}

const addBillPaypal = async (payment) => { 
    await payment.save((err, data) => {
        if(err){
            console.error(err);
        }else{
            if(data){
                console.log(data);
            }
        }
    })
}

const getBillsPaypal = async (req, res) => {

    //Obtener el total de registro y la cantidad de páginas
    // const page_size = parseInt(req.body.page_size);
    const page_size = 11
   

    //Hacer la búsqueda respectiva

    await Paypal
    .count()
    .exec(async (err, count) => {
        if(err) console.log(err)
        if(count){
            let page_num = parseInt(count / page_size); 
            const skips = page_size * (page_num - 1 );
            await Paypal
            .find({}).limit(page_size).skip(skips)
            .sort({date: -1})
            .exec((err, data) => apiResponseV2(req, res, err, data, count, page_num, page_size))
        }
    })






    // await Paypal
    //   .find({}).limit(page_size).skip(skips)
    //   .sort({date: -1})
    //   .exec((err, data) => apiResponse(req, res, err, data))
}




const getBillByTerm = async (req, res) => {
    //Búsqueda de término
    const term = req.body.term;
    const bus = `/^${term}$/`.toString();
    console.log(bus);

    await Paypal
    .find({
        $or: [
            {
              client: new RegExp(term, 'i')
            },
            {
               suscription: new RegExp(term, 'i')
            },
            {
               cedula: new RegExp(term)
            },
            {
               movil: new RegExp(term)
            },
            {
              sku: new RegExp(term, 'i')
            }
            
        ]
    
    
    })
    .exec((err, data) => apiResponse(req, res, err, data))
}


const whereDatePaypal = async (req, res) => {
    let day = req.body.day;
    let cutoff = new Date();  
    console.log("Entrando aqui" + day);

    switch(day){
        case '1' : 
            console.log("Entrando al 1");
            console.log(day + cutoff);          
            cutoff.setDate(cutoff.getDate() - day);
            await Paypal
            .find({ 
                date: {
                    $gte: cutoff
                }
            })
            .sort({date: -1})
            .exec((err, data) => apiResponse(req, res, err, data))
            break;
        

        case '7': 
          console.log("Entrando al 7");
          console.log(day + cutoff);    
        
          cutoff.setDate(cutoff.getDate() - day);
          await Paypal
          .find({ 
              date: {
                  $gte: cutoff
              }
          })
          .sort({date: -1})
          .exec((err, data) => apiResponse(req, res, err, data))
          break;

         case '30': 
            console.log("Entrando al 30");
            console.log(day + cutoff);    

            cutoff.setDate(cutoff.getDate() - day);
            await Paypal
            .find({ 
                date: {
                    $gte: cutoff
                }
            })
            .sort({date: -1})
            .exec((err, data) => apiResponse(req, res, err, data))
            break;

        case '60': 
            console.log("Entrando al 30");
            console.log(day + cutoff);    

            cutoff.setDate(cutoff.getDate() - day);
            await Paypal
            .find({ 
                date: {
                    $gte: cutoff
                }
            })
            .sort({date: -1})
            .exec((err, data) => apiResponse(req, res, err, data))
            break;

        case '90': 
            console.log("Entrando al 30");
            console.log(day + cutoff);    

            cutoff.setDate(cutoff.getDate() - day);
            await Paypal
            .find({ 
                date: {
                    $gte: cutoff
                }
            })
            .sort({date: -1})
            .exec((err, data) => apiResponse(req, res, err, data))
            break;

        default:
        await Paypal
        .find({  })
        .sort({date: -1})
        .exec((err, data) => apiResponse(req, res, err, data))



    } //END SWITCH  
  
}


const activePaypal = async (req, res) => {
    await Paypal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (err, data) => apiResponse(req, res, err, data)
    )
  }





const createPayment = async (req, res) => {
    console.log(InfoPay);
    let price = usd_dop.toFixed(2);
    console.log(`Este es el dolar: ${price}`);

    const create_payment_json = {
        intent: "sale",
        payer: {
            payment_method: "paypal"
        },
        redirect_urls: {
            return_url: `${process.env.URL_API}success-paypal`,
            cancel_url: `${process.env.URL_API}cancel-paypal`
        },
        transactions: [
            {
                item_list: {
                    items: [
                        {
                            name: InfoPay.suscription,
                            sku: InfoPay.sku,
                            price: `${price}`,                        
                            currency: "USD",
                            quantity: 1
                        }
                    ]
                },
                amount: {
                    currency: "USD",        
                    total: `${price}`
                },
                description: "This is the payment description."
            }
        ]
    };


    paypalSDK.payment.create(create_payment_json, (error, payment) => {
        if (error) {
            // throw error;
            res.send({status: 'ALGO HA FALLADO'})
        } else {
            console.log("Create Payment Response");
            console.log(payment);
            res.redirect(payment.links[1].href);
                // res.send({OK: 'Ok'});
        }
    });  
}


const successPayment = async (req, res) => {
    let price = usd_dop.toFixed(2);
    console.log(price);
    var PayerID = req.query.PayerID;
    var paymentId = req.query.paymentId;
    var execute_payment_json = {
        payer_id: PayerID,
        transactions: [
            {
                amount: {
                    currency: "USD",
                    total: `${price}`
                }
            }
        ]
    };

    paypalSDK.payment.execute(paymentId, execute_payment_json, function(
        error,
        payment
    ) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
            // sendEmail(payment);
            addBillPaypal(InfoPay);
            res.render("success");
        }

    });

}

  module.exports = {
    createPayment,
    successPayment,
    registerPayment,
    cancelPayment,
    getBillsPaypal,
    successView,
    getBillByTerm,
    activePaypal,
    whereDatePaypal
    
  }

