const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/myapp'

const store = new MongoDBStore({
  url: MONGODB_URL,
  collection: 'sessions'
});

store.on('error', function(error) {
  console.log(error)
})

module.exports = store;