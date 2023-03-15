const express = require('express');
const router = express.Router();
const nftController = require('../controllers/nft.controller');

// GET all nfts or GET filtered nft list with pagination
router.get('/', nftController.getNfts);

// GET individual nft
router.get('/:nftId', nftController.getNft);

// POST create nft
router.post('/', nftController.createNft);

// PUT edit nft
router.put('/:nftId', nftController.editNft);

// DELETE nft
router.delete('/:nftId', nftController.deleteNft);

// POST like nft
router.post('/:nftId/like', nftController.likeNft);

// DELETE like from nft
router.delete('/:nftId/like', nftController.unlikeNft);

// POST own nft
router.post('/:nftId/own', nftController.ownNft);

// DELETE ownership of nft
router.delete('/:nftId/own', nftController.unownNft);

// POST comment on nft
router.post('/:nftId/comment', nftController.addComment);

// PUT edit comment on nft
router.put('/:nftId/comment/:commentId', nftController.editComment);

// DELETE comment from nft
router.delete('/:nftId/comment/:commentId', nftController.deleteComment);

module.exports = router;