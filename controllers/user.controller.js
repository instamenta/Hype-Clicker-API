const User = require('../models/user.model');

const UserController = {
  getAllUsers: async (req, res, next) => {
    try {
      const { page = 1, limit = 10, sort, filter } = req.query;
      const query = {};

      // apply filters if provided
      if (filter) {
        query.$or = [
          { username: { $regex: filter, $options: 'i' } },
          { email: { $regex: filter, $options: 'i' } },
        ];
      }

      const users = await User.find(query)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(parseInt(limit, 10))
        .exec();

      const count = await User.countDocuments(query);

      res.json({
        data: users,
        total: count,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
      });
    } catch (err) {
      next(err);
    }
  },

  getOneUser: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id).exec();

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (err) {
      next(err);
    }
  },

  editUserData: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id).exec();

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const { username, password, profilePicture } = req.body;

      if (username) {
        user.pastUsernames.push(user.username);
        user.username = username;
      }

      if (password) {
        user.password = password;
      }

      if (profilePicture) {
        user.profilePicture = profilePicture;
      }

      await user.save();

      res.json(user);
    } catch (err) {
      next(err);
    }
  },

  modifyUserMoney: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id).exec();

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const { amount } = req.body;

      if (amount) {
        user.money += amount;
        await user.save();
      }

      res.json(user);
    } catch (err) {
      next(err);
    }
  },

  changeProfilePicture: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id).exec();

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const { profilePicture } = req.body;

      if (!profilePicture) {
        return res.status(400).json({ error: 'Missing profilePicture field' });
      }

      user.profilePicture = profilePicture;
      await user.save();

      res.json(user);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = UserController;
