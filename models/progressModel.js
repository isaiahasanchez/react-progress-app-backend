const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  exercise: String,
  equipment: String,
  image: String,
  sets: String,
  editMode: Boolean, // The editMode field is now simply defined as a Boolean
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
