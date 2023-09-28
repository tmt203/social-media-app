const factory = require('./handlerFactory');
const Post = require('../models/postModel');
const User = require('../models/userModel');
const fileUploader = require('../utils/fileUploader');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const likePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post.likes.includes(req.body.userId)) {
    await post.updateOne({ $push: { likes: req.body.userId } });
    return res.status(200).json({
      status: 'success',
      message: 'The post has been liked.'
    });
  }

  await post.updateOne({ $pull: { likes: req.body.userId } });
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

const uploadSingle = fileUploader.single('file');

const uploadImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next(new AppError('There is no image to upload.', 400));

  console.log(req.file);

  res.status(200).json({
    status: 'success',
    message: 'Upload image successfully.'
  });
});

const getTimeline = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  const userPosts = await Post.find({ author: req.params.id });
  const friendPosts = await Promise.all(
    user.followings.map(async (friendId) => {
      return await Post.find({ author: friendId });
    })
  );

  res.status(200).json({
    status: 'success',
    posts: userPosts.concat(...friendPosts)
  })
});

const getCurrentUserPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find({ author: req.params.userId });

  res.status(200).json({
    status: 'success',
    posts
  });
});

module.exports = {
  createPost: factory.createOne(Post),
  updatePost,
  uploadSingle,
  uploadImage,
  deletePost: factory.deleteOne(Post),
  getPost: factory.getOne(Post),
  getAllPost: factory.getAll(Post),
  likePost,
  getTimeline,
  getCurrentUserPosts
};