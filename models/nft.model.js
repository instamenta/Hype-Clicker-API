const mongoose = require('mongoose');

const nftSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    dateOfCreation: { type: Date, default: Date.now },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ownerEmail: { type: String, required: true },
    comments: [
      {
        commenter: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        body: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    ownedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const NFT = mongoose.model('NFT', nftSchema);

module.exports = NFT;