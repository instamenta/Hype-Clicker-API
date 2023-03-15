const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = require('./app')


dotenv.config();
const port = process.env.PORT || 5000
const MONGODB_URL = "mongodb+srv://janoopsi:janoopsi9999@clickercluster.ltycehn.mongodb.net/?retryWrites=true&w=majority"


mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB cluster!');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
    mongoose.connection.close();
  })