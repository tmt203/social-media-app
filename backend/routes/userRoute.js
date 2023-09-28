const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const userController = require('../controller/userController');

router.get('/:id/friends', userController.getFriends);
router.get('/:id', userController.getUser);
router.get('/', userController.getAllUsers);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);
router.patch('/updatePassword', authController.updatePassword);

// Follow a user
router.patch('/:id/follow', userController.followUser);
// Unfollow a user
router.patch('/:id/unfollow', userController.unfollowUser);

router
  .route('/:id')
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;