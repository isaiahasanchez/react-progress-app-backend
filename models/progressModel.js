const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  exercise: String,
  equipment: String,
  image: String,
  weight: Number,
  reps: Number,
  sets: Number,
  editMode: Boolean,
  lastDateEdited: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
