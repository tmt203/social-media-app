const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const userController = require('../controller/userController');

router.get('/:id/friends', userController.getFriends);
router.patch('/:id/follow', userController.followUser);
router.patch('/:id/unfollow', userController.unfollowUser);
router.get('/:id', userController.getUser);

router
  .route('/:id')
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.patch('/resetPassword/:token', authController.resetPassword);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/updatePassword', authController.updatePassword);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/', userController.getAllUsers);

module.exports = router;