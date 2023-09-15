const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  desc: {
    type: String,
    max: 500,
  },
  img: String,
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
},
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);