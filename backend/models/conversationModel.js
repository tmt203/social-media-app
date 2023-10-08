const mongoose = require('mongoose');

const conversationModel = new mongoose.Schema(
  {
    members: []
  },
  { timestamps: true }
);

module.exports = mongoose.model('Conversation', conversationModel);