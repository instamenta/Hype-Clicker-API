const express = require('express')
const router = express.Router()
const nftController = require('../controllers/nft.controller')
const { validateNFTInput, validateNFT } = require('../utils/validation.utils')
const { authMiddleware} = require('../middlewares/auth.middleware')

// GET all nfts or GET filtered nft list with pagination
router.get('/', nftController.getNfts)

// GET individual nft
router.get('/:nftId', nftController.getNft)

// POST create nft
router.post('/', validateNFTInput(), validateNFT, authMiddleware, nftController.createNft)

// PUT edit nft
router.put('/:nftId', validateNFTInput(), validateNFT, authMiddleware, nftController.editNft)

// DELETE nft
router.delete('/:nftId',authMiddleware, nftController.deleteNft)
    
// POST LIKE nft
router.post('/:nftId/like',authMiddleware, nftController.likeNft)

// DELETE like from nft
router.delete('/:nftId/like',authMiddleware, nftController.unlikeNft)

// POST OWN nft
router.post('/:nftId/own',authMiddleware, nftController.ownNft)

// DELETE ownership of nft
router.delete('/:nftId/own',authMiddleware, nftController.unownNft)

// POST COMMENT on nft
router.post('/:nftId/comment',authMiddleware, nftController.addComment)

// PUT edit COMMENT on nft
router.put('/:nftId/comment/:commentId',authMiddleware, nftController.editComment)

// DELETE COMMENT from nft
router.delete('/:nftId/comment/:commentId',authMiddleware, nftController.deleteComment)

module.exports = router;