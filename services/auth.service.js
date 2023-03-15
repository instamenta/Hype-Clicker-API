const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { JWT_SECRET } = process.env;

async function signup(userDTO) {
  const existingUser = await User.findOne({ email: userDTO.email });
  if (existingUser) {
    throw new Error('Email already in use');
  }
  const hashedPassword = await bcrypt.hash(userDTO.password, 10);
  const user = new User({
    email: userDTO.email,
    password: hashedPassword,
  });
  await user.save();
  const token = jwt.sign({ userId: user._id }, JWT_SECRET);
  return { userId: user._id, token };
}

async function login(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid login credentials');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid login credentials');
  }
  const token = jwt.sign({ userId: user._id }, JWT_SECRET);
  return { userId: user._id, token };
}

module.exports = {
  signup,
  login,
};