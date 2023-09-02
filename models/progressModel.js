const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  exercise: String,
  equipment: String,
  image: String,
  sets: [{
    weight: Number,
    reps: Number
  }],
  editMode: Boolean,
  lastDateEdited: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
