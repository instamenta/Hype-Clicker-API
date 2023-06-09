const authService = require('../services/auth.service');

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.register({ email, password });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const logout = (req, res, next) => {
  try {
    req.logout();
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
};