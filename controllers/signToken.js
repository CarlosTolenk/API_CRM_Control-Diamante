const jwt = require('jwt-simple'),
moment = require('moment'),
config = require('../config');

exports.createToken = (req, res)  => {  
    const payload = {
      sub: req.body,
      iat: moment().unix(),
      exp: moment().add(1, "days").unix(),
    };
    console.log(payload.sub);
    token = jwt.encode(payload, process.env.TOKEN_SECRET);
 
    res.send({token})

};