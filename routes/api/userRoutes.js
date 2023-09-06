const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createNewUser,
    deleteUser,
    updateUser
} = require('../../controllers/userController.js');

// /api/users
router.route('/').get(getUsers).post(createNewUser);

// /api/users/:userId
router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

    module.exports = router;