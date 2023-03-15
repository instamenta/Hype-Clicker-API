const express = require('express')
const router = express.Router()
const nftController = require('../controllers/nft.controller')
const { validateNFTInput, validateNFT } = require('../utils/validation.utils')
const { authMiddleware, ownerGuard, notOwnerGuard } = require('../middlewares/auth.middleware')

// GET all NFTs or GET filtered NFT list with pagination
router.get('/', nftController.getNfts)

// GET individual NFT
router.get('/:nftId', nftController.getNft)

// POST create NFT
router.post('/',authMiddleware,  validateNFTInput(), validateNFT, nftController.createNft)

// PUT edit NFT
router.put('/:nftId',authMiddleware,ownerGuard, validateNFTInput(), validateNFT,  nftController.editNft)

// DELETE NFT
router.delete('/:nftId',authMiddleware, ownerGuard, nftController.deleteNft)
    
// POST LIKE NFT
router.post('/:nftId/like',authMiddleware,notOwnerGuard, nftController.likeNft)

// DELETE like from NFT
router.delete('/:nftId/like',authMiddleware,notOwnerGuard, nftController.unlikeNft)

// POST OWN NFT
router.post('/:nftId/own',authMiddleware,notOwnerGuard, nftController.ownNft)

// DELETE ownership of NFT
router.delete('/:nftId/own',authMiddleware,notOwnerGuard, nftController.unownNft)

// POST COMMENT on NFT
router.post('/:nftId/comment',authMiddleware, nftController.addComment)

// PUT edit COMMENT on NFT
router.put('/:nftId/comment/:commentId',authMiddleware, nftController.editComment)

// DELETE COMMENT from NFT
router.delete('/:nftId/comment/:commentId',authMiddleware, nftController.deleteComment)

module.exports = router;