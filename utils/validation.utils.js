const { check, validationResult } = require('express-validator')
// const User = require('../models/user.model')
const NFT = require('../models/nft.model')

// Validate User input
const validateUserInput = () => {
  return [
    check('username').trim().notEmpty().withMessage('Username is required'),
    check('email').trim().isEmail().withMessage('Email is not valid'),
    check('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/\d/)
      .withMessage('Password must contain at least one number'),
  ]
}
// Validate NFT input
const validateNFTInput = () => {
  return [
    check('name').trim().notEmpty().withMessage('Name is required'),
    check('description').trim().notEmpty().withMessage('Description is required'),
    check('price')
      .isNumeric({ no_symbols: true })
      .withMessage('Price must be a number')
      .isFloat({ min: 0 })
      .withMessage('Price must be greater than or equal to 0'),
  ]
}

// Middleware to validate user input
const validateUser = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

// Middleware to validate nft input
const validateNFT = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { name } = req.body
  try {
    const existingNFT = await NFT.findOne({ name })
    if (existingNFT) {
      return res.status(400).json({ errors: [{ msg: 'NFT with that name already exists' }] })
    }
    next();
  } catch (error) {
    return res.status(500).json({ errors: [{ msg: 'Server error' }] })
  }
}

module.exports = {
  validateUserInput,
  validateNFTInput,
  validateUser,
  validateNFT,
}