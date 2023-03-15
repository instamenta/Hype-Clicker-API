const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const { verifyToken } = require('../utils/jwt.utils')

const  authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = verifyToken(token)
    const userId = decodedToken.userId
    const user = await User.findById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' })
  }
}

const guestGuard = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = verifyToken(token)
    const userId = decodedToken.userId

    if (userId) {
      return res.status(403).json({ message: 'Forbidden' })
    }
    next()
  } catch (error) {
    next()
  }
}
const notOwnerGuard = async (req, res, next) => {
  try {
    const nft = await NFT.findById(req.params.nftId);

    if (!nft) {
      return res.status(404).json({ message: 'NFT not found' });
    }

    if (String(nft.owner) === String(req.user._id)) {
      return res.status(403).json({ message: 'You are the owner of this NFT' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
const ownerGuard = async (req, res, next) => {
  try {
    const nft = await NFT.findById(req.params.nftId);

    if (!nft) {
      return res.status(404).json({ message: 'NFT not found' });
    }

    if (String(nft.owner) !== req.user._id) {
      return res.status(403).json({ message: 'You are not the owner of this NFT' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { authMiddleware, guestGuard, notOwnerGuard , ownerGuard}