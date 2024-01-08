const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/usercontroller');

// /api/user
router.route('/').get(getUser).post(createUser);

// /api/user/:userId
router.route('/:userId/update').put(updateUser);

// /api/user/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser)

// /api/user/:userId/friend/:friendId
router.route('/:userId/friend/:friendId').put(addFriend).delete(removeFriend);


module.exports = router;
