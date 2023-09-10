const router = require('express').Router();
const {
    getAllThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
	createReaction,
	removeReaction,
  } = require('../../controllers/thoughtController');

// thoughts
router.route('/').get(getAllThoughts).post(createThought);

// thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);

// thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction);

// thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction)

module.exports = router;