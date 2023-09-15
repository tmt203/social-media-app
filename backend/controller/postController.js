const factory = require('./handlerFactory');
const Post = require('../models/postModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const likePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post.likes.includes(req.user._id)) {
    await post.updateOne({ $push: { likes: req.user._id } });
    return res.status(200).json({
      status: 'success',
      message: 'The post has been liked.'
    });
  }

  await post.updateOne({ $pull: { likes: req.user._id } });
  res.status(200).json({
    status: 'success',
    message: 'The post has been unliked.'
  });
});

const updatePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (post.author !== req.user._id) return next(new AppError('You can not update the post that you not owned.', 403));

  await post.updateOne(req.body);

  res.status(200).json({
    status: "success",
    message: "The post has been updated."
  });
});

const getTimeline = catchAsync(async (req, res, next) => {
  const userPosts = await Post.find({ author: req.user._id });
  const friendPosts = await Promise.all(
    req.user.followings.map(async (friendId) => {
      return await Post.find({ author: friendId });
    })
  );

  res.status(200).json({
    status: 'success', 
    data: userPosts.concat(...friendPosts)
  })
});

module.exports = {
  createPost: factory.createOne(Post),
  updatePost,
  deletePost: factory.deleteOne(Post),
  getPost: factory.getOne(Post),
  getAllPost: factory.getAll(Post),
  likePost,
  getTimeline
};