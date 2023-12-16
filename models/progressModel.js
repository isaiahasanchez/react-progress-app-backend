const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  exercise: String,
  equipment: String,
  image: String,
  sets: String,
  lastDateEdited: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
