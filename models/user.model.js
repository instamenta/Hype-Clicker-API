const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    password: { type: String, required: true, minlength: 6 },
    email: { type: String, required: true, unique: true },
    money: { type: Number, default: 0 },
    likedNfts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NFT' }],
    ownedNfts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NFT' }],
    profilePictureUrl: { type: String },
    pastUsernames: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    comments: [
      {
        nft: { type: mongoose.Schema.Types.ObjectId, ref: 'NFT' },
        body: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// Custom error message for duplicate values
userSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    const message = `The ${field} is already taken, please choose another one`;
    next(new Error(message));
  } else {
    next(error);
  }
});

// Custom error message for validation errors
userSchema.post('validate', function (error, doc, next) {
  if (error) {
    next(new Error('Invalid'));
  } else {
    next();
  }
});

// Hash password before saving to database
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;