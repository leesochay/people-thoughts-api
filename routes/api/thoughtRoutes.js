const router = require('express').Router();
const {
    getAllThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
  } = require('../../controllers/thoughtController');

  // /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);

module.exports = router;