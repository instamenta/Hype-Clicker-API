const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { validateUserInput, validateUser } = require('../utils/validation.utils');

// Get all users with optional query filters and pagination
router.get('/', UserController.getAllUsers);

// Get a single user by ID
router.get('/:id', UserController.getOneUser);

// Update a user's data
router.put('/:id', validateUserInput(), validateUser, UserController.updateUser);

// Add or remove money from a user's account
router.patch('/:id/money', UserController.modifyUserMoney);

// Change a user's profile picture
router.patch('/:id/profile-picture', UserController.changeProfilePicture);

// Delete a user
router.delete('/:id', UserController.deleteUser);

module.exports = router;