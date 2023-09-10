const { Thought, User } = require('../models')

module.exports = {
    // Get all thoughts
    async getAllThoughts(req, res) {
      try {
        const thoughts = await Thought.find();
        res.json(thoughts);
      } catch (err) {
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
        return res.status(500).json(err);
      }
    },

  //create a thought
  async createThought(req, res) {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
            { username: req.body.username },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({
                message: 'Thought created, but found no user with that ID',
            });
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
},

  //delete a thought
  async deleteThought(req, res) {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
  },

    //update a thought
    async updateThought(req, res) {
      try {
          const thought = await Thought.findOneAndUpdate(
              { _id: req.params.thoughtId },
              { $set: req.body },
              { runValidators: true, new: true }
          );
          if (!thought) {
              return res.status(404).json({ message: 'No thought with this id!' });
          }
          res.json(thought);
      } catch (err) {
          res.status(500).json(err);
      }
    },
  
  // add a reaction to thought
  async createReaction(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
},
  
  // remove a reaction from thought
  async removeReaction(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
  };
