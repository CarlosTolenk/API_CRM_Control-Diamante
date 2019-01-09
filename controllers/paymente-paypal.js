const Paypal = require('../models/bill-paypal');
const paypalSDK = require("paypal-rest-sdk");
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

const sending = (mailOptions) => {
        


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

const getCurrency = async () => {
    try {
      return await axios.get('https://free.currencyconverterapi.com/api/v6/convert?q=USD_DOP&compact=y')
    } catch (error) {
      console.error(error)
    }
  }



const registerPayment =  async (req, res) => { 
    let payment = new Paypal(req.body);    
    InfoPay = payment;  
    console.log(InfoPay);


    const dolar = getCurrency()
        .then(response => {
            usd_dop = payment.amount/response.data.USD_DOP.val  
            console.log(usd_dop);  
            res.send({
                status: 'OK',                
            })
            // res.redirect(`${process.env.URL_API}}payment-paypal`);
        })
        .catch((err) => {
            console.log(err);
            res.send({
                status: 'OK',                
            })
        }) 
  
}

const cancelPayment = async (req, res) => {
    res.render("cancel");
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

const getBillPaypal = async (req, res) => {
    await Paypal
      .find({})  
      .exec((err, data) => apiResponse(req, res, err, data))
  }


const createPayment = async (req, res) => {
    console.log(InfoPay);
    let price = usd_dop.toFixed(2);
    console.log(price);

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
            sendEmail(payment);
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
    getBillPaypal
  }

