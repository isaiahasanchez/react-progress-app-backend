const mongoose = require('mongoose');

// Defines the sub-schema for individual sets
const SetSchema = new mongoose.Schema({
  weight: Number,
  reps: Number,
});

// Defines the sub-schema for the workout on a particular date
const WorkoutSchema = new mongoose.Schema({
  date: Date,
  set: [SetSchema],
});

const exerciseSchema = new mongoose.Schema({
  exerciseName: String,
  equipment: String,
  image: String,
  workouts: [WorkoutSchema],
  editMode: Boolean,
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
