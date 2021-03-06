const express = require('express'),
  fileUpload = require('express-fileupload'),
  config = require('./config'),
  multer = require('multer'),
  upload = multer(),
  app = express(),
  router = require('./routes/router'),
  engines = require("consolidate");
  bodyParser = require('body-parser');

app
  .set('port', process.env.PORT)
  //para parsear application/json
  .use(express.json())
  .set("views", "./views")
  .set("view engine", "ejs")
  //para parsear application/xwww-form-urlencoded


  .use(express.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(express.static('./public'))


  // .use(express.urlencoded({ extended: true }))
  // .use(express.json())





  //para parsear multipart/form-data
  // .use(upload.array())  
  .use(fileUpload())
  .use((req, res, next) => {
    //https://enable-cors.org/
    res.header('Access-Control-Allow-Origin', '*')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    next()
  })
  .use('/api', router)

module.exports = app
