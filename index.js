const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = require('./app')
const { initializeApp } = require('firebase/app')
const { getAnalytics } = require("firebase/analytics")

dotenv.config();
const port = process.env.PORT || 5000
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/myapp'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const analytics = getAnalytics(firebaseApp)

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
