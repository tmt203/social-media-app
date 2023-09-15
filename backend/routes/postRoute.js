const express = require('express');
const postController = require('../controller/postController');
const { protect, restrictTo } = require('../controller/authController');
const router = express.Router();

const getAuthor = (req, res, next) => {
  req.body['author'] = req.user._id;
  next();
};

const fillByOwner = (req, res, next) => {
  req.query['author'] = req.user._id;
  next();
}

router.get('/timeline', protect, postController.getTimeline);
router.get('/', protect, fillByOwner, postController.getAllPost);
router.get('/:id', postController.getPost);

router.use(protect);
router.post('/', getAuthor, postController.createPost);
router.patch('/:id/like', postController.likePost);

router
  .route('/:id')
  .patch(postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;