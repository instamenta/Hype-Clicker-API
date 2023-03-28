const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = require('./app')


dotenv.config();
const port = process.env.PORT || 5000
const MONGODB_URL = "mongodb+srv://janoopsi:janoopsi9999@clickercluster.ltycehn.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`MongoDB is connected on ${MONGODB_URL}`)
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  })
  .catch((error) => {
    console.error('Error connecting to database:', error)
  })