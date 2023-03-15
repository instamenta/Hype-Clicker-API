const express = require('express')
const router = express.Router()
const passport = require('passport')
const authController = require('../controllers/auth.controller')
const { authMiddleware, guestGuard } = require('../middlewares/auth.middleware')

// register route
router.post('/register',guestGuard, authController.register)

// Login route
router.post('/login',guestGuard, passport.authenticate('local'), authController.login)

// Logout route
router.post('/logout', authMiddleware, authController.logout)

module.exports = router