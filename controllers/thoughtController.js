const { Thought, User } = require('../models')

module.exports = {
    // Get all thoughts
    async getAllThoughts(req, res) {
      try {
        const thoughts = await Thought.find();
        res.json(thoughts);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    // Get a single thought
    async getSingleThought(req, res) {
      try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
          .select('-__v');
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' })
        }
          res.json(thought);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },

    // create a new thought
    async createUser(req, res) {
      try {
        const thought = await Thought.create(req.body);
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    // Delete a user
    async deleteThought(req, res) {
      try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.userId });
        if (!thought) {
          return res.status(404).json({ message: 'No such thought exists' });
        }
          res.json({ message: 'Thought successfully deleted' });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
  
    // Update user
    async updateThought(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.userId },
            {$set: req.body}
        );
        if (!thought) {
          return res
            .status(404)
            .json({ message: 'No thought found with that ID' });
        }
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
  };