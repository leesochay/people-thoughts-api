const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
  	addFriend,
  	removeFriend,
  } = require('../../controllers/userController');

// users
router.route('/').get(getAllUsers).post(createUser);

// users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend)

module.exports = router;