const express = require('express')
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const morgan = require('morgan');
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')
const nftRoutes = require('./routes/nft.routes')
const errorMiddleware = require('./middlewares/error.middleware')
const store = require('./store');

const app = express()

app.use(morgan('common', {
  skip: function (req, res) {
    
    return res.statusCode < 400 // don't log successful responses
  }
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  store: store,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/nft', nftRoutes);

app.use(errorMiddleware);

module.exports = app;