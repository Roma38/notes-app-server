var mongoose = require("mongoose");

var postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  body: String,
  author: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("post", postSchema);
