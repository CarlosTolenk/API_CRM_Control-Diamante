process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
process.env.PORT = process.env.PORT || 3000
process.env.TOKEN_SECRET = "cRm+ERP.t0kEN_cTolenk/c0ntrolD14mte"
process.env.AUTH_TOKEN_TWILIO = "f2fb5ea3f47f5d25daca34b3e5c79731"
process.env.ACCOUNT_SID_TWILIO = "AC30a179fb6e48bf18c26ce6865a5feec7"
process.env.NUMBER_FROM_TWILIO = "+13016846880"

//Sandbox
// process.env.CLIENT_PAYPAL_ID = 'AaMpoV1m_NTOrm-QyJpTm6P-rVJjFzKNGNdtiqcnYkYp6eI8FZuZOos5Q25f9GcA1hGv1H97pnsJ3RUv'
// process.env.CLIENT_PAYPAL_SECRET = 'EIDT5MoAficLwY0VALg0RJ_bhXayVDpOjUPRx3gJyYhIzPF8mmB_vLheNKia1mU-OXVcDj-9EjyVsu_b'


//Live
process.env.CLIENT_PAYPAL_ID = 'AdCaN-s5b3kEuNGyjsQQjLWv5arag55087H1wAEzV03BG47sWRB8CsYfb16UUqdiOofKZkdqxYOos9D9'
process.env.CLIENT_PAYPAL_SECRET = 'EAWwyaeML_1XReg-zbcYA0Ye9c_cEBJ07MLHw_WqKgn1ob1nS9mkdJ49JD92UvtM7xqEYezE_4qkCt4L'

// auth token f2fb5ea3f47f5d25daca34b3e5c79731
// AC30a179fb6e48bf18c26ce6865a5feec7
// from +13016846880

if (process.env.NODE_ENV === 'dev') {
  process.env.URL_DB = 'mongodb://localhost:27017/crm-control-diamante2'
  process.env.URL_API = 'http://159.65.111.29/api/'
  
} else {
  process.env.URL_DB = 'mongodb://CTolenk:CRMControlDiamante2018!@ds223760.mlab.com:23760/crm-control-diamante'
  process.env.URL_API = 'https://api-crm-control-diamante.herokuapp.com/api/'

}

// https://api-crm-control-diamante.herokuapp.com/api