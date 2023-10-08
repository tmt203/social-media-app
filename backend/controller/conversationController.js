const Conversation = require('../models/conversationModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const createConversation = catchAsync(async (req, res) => {
  const doc = await Conversation.create({
    members: [req.body.senderId, req.body.receiverId]
  });
  doc['__v'] = undefined;

  res.status(200).json({
    status: 'success',
    data: doc
  });
});

const getConversation = catchAsync(async (req, res, next) => {
  const conversation = await Conversation.find({
    members: { $in: [req.params.userId] }
  });

  if (!conversation) return next(new AppError('There is no conversation with that user ID.'), 404);

  res.status(200).json({
    status: 'success',
    data: conversation
  });
});

module.exports = {
  createConversation,
  getConversation
}