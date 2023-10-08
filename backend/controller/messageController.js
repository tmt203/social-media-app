const Message = require('../models/messageModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const createMessage = catchAsync(async (req, res) => {
  const doc = await Message.create(req.body);
  doc['__v'] = undefined;

  res.status(200).json({
    status: 'success',
    data: doc
  });
});

const getAllMessages = catchAsync(async (req, res, next) => {
  const messages = await Message.find({
    conversation: req.params.conversationId
  });

  if (!messages) return next(new AppError('There is no message found with that conversation ID.', 404));

  res.status(200).json({
    status: 'success',
    data: messages
  });
});

module.exports = {
  createMessage,
  getAllMessages
}