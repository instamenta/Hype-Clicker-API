const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/auth.controller');

// Signup route
router.post('/signup', authController.signup);

// Login route
router.post('/login', passport.authenticate('local'), authController.login);

// Logout route
router.post('/logout', authController.logout);

module.exports = router;