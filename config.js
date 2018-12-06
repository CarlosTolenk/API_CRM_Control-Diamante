process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
process.env.PORT = process.env.PORT || 3000

if (process.env.NODE_ENV === 'dev') {
  process.env.URL_DB = 'mongodb://localhost:27017/crm-control-diamante2'
} else {
  process.env.URL_DB = 'mongodb://edteam:edteam2018@ds235418.mlab.com:35418/edmaratones'
}
