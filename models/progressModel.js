const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  exercise: String,
  equipment: String,
  image: String,
  // Change sets to an array once frontend feature branch finishes
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

const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;
