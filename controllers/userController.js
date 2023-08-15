const { User } = require('../models')

module.exports = {
    // Get all users
    async getAllUsers(req, res) {
      try {
        const users = await User.find();
        res.json(users);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    // Get a single user
    async getSingleUser(req, res) {
      try {
        const user = await User.findOne({ _id: req.params.userId })
          .select('-__v');
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' })
        }
          res.json(user);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },

    // create a new user
    async createUser(req, res) {
      try {
        const user = await User.create(req.body);
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    // Delete a user
    async deleteUser(req, res) {
      try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
        if (!user) {
          return res.status(404).json({ message: 'No such user exists' });
        }
          res.json({ message: 'User successfully deleted' });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
  

    // Update user
    async updateUser(req, res) {
      try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            {$set: req.body}
        );
        if (!user) {
          return res
            .status(404)
            .json({ message: 'No user found with that ID' });
        }
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
  };