const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');
const store = require('./store');


dotenv.config();
const port = process.env.PORT || 5000
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/myapp'


mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
  console.log(`MongoDB is connected on ${MONGODB_URL}`)
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
})
.catch((error) => {
  console.error('Error connecting to database:', error)
})
