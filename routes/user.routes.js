const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user.controller')
const { validateUserInput, validateUser } = require('../utils/validation.utils')
const { authMiddleware } = require('../middlewares/auth.middleware')
// Get all users with optional query filters and pagination
router.get('/', UserController.getAllUsers)

// Get a single user by ID
router.get('/:id', UserController.getOneUser)

// Update a user's data
router.patch('/:id',validateUserInput(), validateUser, authMiddleware, UserController.editUserData)

// Add or remove money from a user's account
router.patch('/:id/money',authMiddleware, UserController.modifyUserMoney)

// Change a user's profile picture
router.patch('/:id/profile-picture',authMiddleware, UserController.changeProfilePicture)

module.exports = router;