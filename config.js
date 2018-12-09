process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
process.env.PORT = process.env.PORT || 3000
process.env.TOKEN_SECRET = "cRm+ERP.t0kEN_cTolenk/c0ntrolD14mte"
process.env.AUTH_TOKEN_TWILIO = "f2fb5ea3f47f5d25daca34b3e5c79731"
process.env.ACCOUNT_SID_TWILIO = "AC30a179fb6e48bf18c26ce6865a5feec7"
process.env.NUMBER_FROM_TWILIO = "+13016846880"


// auth token f2fb5ea3f47f5d25daca34b3e5c79731
// AC30a179fb6e48bf18c26ce6865a5feec7
// from +13016846880

if (process.env.NODE_ENV === 'dev') {
  process.env.URL_DB = 'mongodb://localhost:27017/crm-control-diamante2'
} else {
  process.env.URL_DB = 'mongodb://edteam:edteam2018@ds235418.mlab.com:35418/edmaratones'
}
