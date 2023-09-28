const User = require('../models/userModel');
const factory = require('../controller/handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const filterObject = (obj, ...allowFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
}

const getFriends = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate('followings', ['_id', 'username', 'profilePicture']);

  res.status(200).json({
    status: 'success',
    friends: user.followings
  });
});

module.exports = {
  getAllUsers: factory.getAll(User),
  getUser: factory.getOne(User),
  updateUser: catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.confirmPassword) {
      return next(new AppError('This route is not for update password. Please use /updatePassword instead.', 400));
    }
    const filterBody = filterObject(req.body, 'firstName', 'lastName', 'mobile', 'desc', 'city', 'from', 'relationship');
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      user: updatedUser
    });
  }),
  deleteUser: catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.params.id, { active: false });
    res.status(204).json({
      status: 'success',
      data: null
    });
  }),

  followUser: catchAsync(async (req, res, next) => {
    if (req.body.userId === req.params.id) return next(new AppError('You can not follow yourself.', 400));

    const followedUser = await User.findById(req.params.id);

    if (followedUser.followers.includes(req.body.userId)) return next(new AppError('You already follow this user.', 403));

    await followedUser.updateOne({ $push: { followers: req.body.userId } });
    await User.findByIdAndUpdate(req.body.userId, { $push: { followings: followedUser._id } });

    res.status(200).json({
      status: 'success',
      message: 'user has been followed'
    });
  }),

  unfollowUser: catchAsync(async (req, res, next) => {
    if (req.body.userId === req.params.id) return next(new AppError('You can not unfollow yourself.', 400));

    const followedUser = await User.findById(req.params.id);

    if (!followedUser.followers.includes(req.body.userId)) return next(new AppError('You are not follow this user.', 403));

    await followedUser.updateOne({ $pull: { followers: req.body.userId } });
    await User.findByIdAndUpdate(req.body.userId, { $pull: { followings: followedUser._id } });

    res.status(200).json({
      status: 'success',
      message: 'user has been unfollowed'
    });
  }),

  getFriends,
};