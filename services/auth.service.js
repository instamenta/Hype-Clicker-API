const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const { generateToken } = require('../utils/jwt.utils')

async function register(data) {

  const existingUser = await User.findOne({ email: data.email })
  if (existingUser) {
    throw new Error('Email already in use')
  }
  const user = new User({
    email: data.email,
    password: data.password,
  })
  await user.save()
  const token = generateToken({ userId: user._id })
  return { userId: user._id, token }
}

async function login(email, password) {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('Invalid login credentials')
  }
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    throw new Error('Invalid login credentials')
  }
  const token = generateToken({ userId: user._id })
  return { userId: user._id, token }
}

module.exports = {
  register,
  login,
};