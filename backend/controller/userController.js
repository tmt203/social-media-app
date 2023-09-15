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

module.exports = {
  getAllUsers: factory.getAll(User),
  getUser: factory.getOne(User),
  updateUser: catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.confirmPassword) {
      return next(new AppError('This route is not for update password. Please use /updatePassword instead.', 400));
    }
    const filterBody = filterObject(req.body, 'firstName', 'lastName', 'mobile');
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: { updatedUser }
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
    if (req.user._id === req.params.id) return next(new AppError('You can not follow yourself.', 400));

    const followedUser = await User.findById(req.params.id);

    if (followedUser.followers.includes(req.user._id)) return next(new AppError('You already follow this user.', 403));

    await followedUser.updateOne({ $push: { followers: req.user._id } });
    await req.user.updateOne({ $push: { followings: followedUser._id } });

    res.status(200).json({
      status: 'success',
      message: 'user has been followed'
    });
  }),

  unfollowUser: catchAsync(async (req, res, next) => {
    if (req.user._id === req.params.id) return next(new AppError('You can not unfollow yourself.', 400));

    const unfollowedUser = await User.findById(req.params.id);

    if (!unfollowedUser.followers.includes(req.user._id)) return next(new AppError('You are not follow this user.', 403));

    await unfollowedUser.updateOne({ $pull: { followers: req.user._id } });
    await req.user.updateOne({ $pull: { followings: unfollowedUser._id } });

    res.status(200).json({
      status: 'success',
      message: 'user has been unfollowed'
    });
  }),
};