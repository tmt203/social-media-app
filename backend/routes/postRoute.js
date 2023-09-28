const express = require('express');
const postController = require('../controller/postController');
const { protect, restrictTo } = require('../controller/authController');
const router = express.Router();

// const getAuthor = (req, res, next) => {
//   req.body['author'] = req.user._id;
//   next();
// };

const fillByOwner = (req, res, next) => {
  req.query['author'] = req.user._id;
  next();
}

router.patch('/:id/like', postController.likePost);
router.get('/:id', postController.getPost);
router
.route('/:id')
.patch(postController.updatePost)
.delete(postController.deletePost);

router.get('/profile/:userId', postController.getCurrentUserPosts);
router.get('/timeline/:id', postController.getTimeline);
router.post('/uploadImage', postController.uploadSingle, postController.uploadImage);
router.get('/', protect, fillByOwner, postController.getAllPost);
router.post('/', postController.createPost);

module.exports = router;