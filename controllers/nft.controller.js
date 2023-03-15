const Nft = require('../models/nft.model');

const createNft = async (req, res, next) => {
    try {
        const { name, description, imageUrl, tags } = req.body;
        const userId = req.user.id;

        const nft = new Nft({
            name,
            description,
            imageUrl,
            tags,
            createdBy: userId
        });

        await nft.save();
        res.status(201).json(nft);
    } catch (error) {
        next(error);
    }
};

const getNfts = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, tag } = req.query;
        const skip = (page - 1) * limit;
        const query = tag ? { tags: tag } : {};

        const [nfts, count] = await Promise.all([
            Nft.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(Number(limit))
                .populate('createdBy', 'username')
                .populate('likes', 'username')
                .populate('owners', 'username'),
            Nft.countDocuments(query)
        ]);

        res.status(200).json({
            nfts,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page),
            tag
        });
    } catch (error) {
        next(error);
    }
};

const getNft = async (req, res, next) => {
    try {
        const { nftId } = req.params;

        const nft = await Nft.findById(nftId)
            .populate('createdBy', 'username')
            .populate('likes', 'username')
            .populate('owners', 'username')
            .populate({
                path: 'comments.user',
                select: 'username'
            });

        if (!nft) {
            return res.status(404).json({ message: 'NFT not found' });
        }

        res.status(200).json(nft);
    } catch (error) {
        next(error);
    }
};

const editNft = async (req, res, next) => {
    try {
        const { nftId } = req.params;
        const { name, description, imageUrl, tags } = req.body;
        const userId = req.user.id;

        const nft = await Nft.findById(nftId);

        if (!nft) {
            return res.status(404).json({ message: 'NFT not found' });
        }

        if (nft.createdBy.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to perform this action' });
        }

        nft.name = name;
        nft.description = description;
        nft.imageUrl = imageUrl;
        nft.tags = tags;

        await nft.save();
        res.status(200).json(nft);
    } catch (error) {
        next(error);
    }
};

const deleteNft = async (req, res, next) => {
    try {
        const { nftId } = req.params;
        const userId = req.user.id;

        const nft = await Nft.findById(nftId);

        if (!nft) {
            return res.status(404).json({ message: 'NFT not found' });
        }

        if (nft.createdBy.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to perform this action' });
        }

        await nft.delete();

        res.status(200).json({ message: 'NFT deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// Like Logic => 
const likeNft = async (req, res, next) => {
    try {
        const nftId = req.params.nftId;
        const userId = req.user.id; // assuming you're using some kind of authentication middleware to get the user ID

        const nft = await Nft.findById(nftId);

        if (!nft) {
            return res.status(404).json({ message: 'NFT not found' });
        }

        if (nft.likes.includes(userId)) {
            return res.status(400).json({ message: 'NFT already liked by user' });
        }

        nft.likes.push(userId);
        await nft.save();

        res.json(nft);
    } catch (error) {
        next(error);
    }
};
const unlikeNft = async (req, res, next) => {
    try {
        const nftId = req.params.nftId;
        const userId = req.user.id; // assuming you're using some kind of authentication middleware to get the user ID

        const nft = await Nft.findById(nftId);

        if (!nft) {
            return res.status(404).json({ message: 'NFT not found' });
        }

        if (!nft.likes.includes(userId)) {
            return res.status(400).json({ message: 'NFT not liked by user' });
        }

        nft.likes = nft.likes.filter(id => id !== userId);
        await nft.save();

        res.json(nft);
    } catch (error) {
        next(error);
    }
};

// Own Logic => 

const ownNft = async (req, res, next) => {
    try {
      const nftId = req.params.nftId;
      const userId = req.user.id; // assuming you're using some kind of authentication middleware to get the user ID
  
      const nft = await Nft.findById(nftId);
  
      if (!nft) {
        return res.status(404).json({ message: 'NFT not found' });
      }
  
      if (nft.owner) {
        return res.status(400).json({ message: 'NFT already owned by another user' });
      }
  
      nft.owner = userId;
      await nft.save();
  
      res.json(nft);
    } catch (error) {
      next(error);
    }
  };

const unownNft = async (req, res, next) => {
    try {
        const { nftId } = req.params;
        const userId = req.user.id;

        const nft = await Nft.findById(nftId);

        if (!nft) {
            return res.status(404).json({ message: 'NFT not found' });
        }

        const index = nft.owners.indexOf(userId);
        if (index === -1) {
            return res.status(400).json({ message: 'You do not own this NFT' });
        }

        nft.owners.splice(index, 1);
        await nft.save();

        res.status(200).json({ message: 'NFT ownership removed successfully' });
    } catch (error) {
        next(error);
    }
};
// Comment Logic => 
const commentNft = async (req, res, next) => {
    try {
        const { nftId } = req.params;
        const { text } = req.body;
        const userId = req.user.id;

        const nft = await Nft.findById(nftId);

        if (!nft) {
            return res.status(404).json({ message: 'NFT not found' });
        }

        const comment = {
            user: userId,
            text
        };

        nft.comments.push(comment);
        await nft.save();

        res.status(201).json(comment);
    } catch (error) {
        next(error);
    }
};

const editCommentNft = async (req, res, next) => {
    try {
        const { nftId, commentId } = req.params;
        const { text } = req.body;
        const userId = req.user.id;

        const nft = await Nft.findById(nftId);

        if (!nft) {
            return res.status(404).json({ message: 'NFT not found' });
        }

        const comment = nft.comments.id(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.user.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to perform this action' });
        }

        comment.text = text;
        await nft.save();

        res.status(200).json(comment);
    } catch (error) {
        next(error);
    }
};

const deleteCommentNft = async (req, res, next) => {
    try {
        const { nftId, commentId } = req.params;
        const userId = req.user.id;

        const nft = await Nft.findById(nftId);

        if (!nft) {
            return res.status(404).json({ message: 'NFT not found' });
        }

        const comment = nft.comments.id(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.user.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to perform this action' });
        }

        comment.remove();
        await nft.save();

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createNft,
    getNfts,
    getNft,
    editNft,
    deleteNft,
    likeNft,
    unlikeNft,
    ownNft,
};