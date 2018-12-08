const jwt = require('jwt-simple'),
moment = require('moment');


exports.ensureAuthenticated = function(req, res, next) {
  if(!req.headers.authorization) {
    return res
      .status(401)
      .send({message: "No tienes autorización para petición"});
  }
  
  const token = req.headers.authorization.split(" ")[2];
  const payload = jwt.decode(token, process.env.TOKEN_SECRET);
  
  if(payload.exp <= moment().unix()) {
     return res
     	.status(403)
        .send({message: "El token ha expirado"});
  }

  console.log(payload.sub)
  
//   req.user = payload.sub;
  next();
}

exports.ensureAuthenticatedShift = (req, res, next) => {
    if(!req.headers.authorization) {
      return res
        .status(401)
        .send({message: "No tienes autorización para petición"});
    }
    
    const token = req.headers.authorization.split(" ")[2];
    const payload = jwt.decode(token, process.env.TOKEN_SECRET);
    
    if(payload.exp <= moment().unix()) {
       return res
          .status(403)
          .send({message: "El token ha expirado"});
    }else{
        if(payload.sub.role == 'Shift' || payload.sub.role == 'Admin'){
            next();
        }else{
            return res
            .status(401)
            .send({message: "No tienes autorización SUPER ROLE para petición"});
        }

    }
  }