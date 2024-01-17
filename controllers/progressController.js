const Exercise = require('../models/progressModel');
const User = require('../models/user');
const passport = require('passport');

const createNewUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ user });
  } catch (error) {
    res.status(400).send(error);
  }
};

const loginController = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!user) {
      return res.status(401).json({ message: 'Login failed. Check email or password.' });
    }
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.send({ user: user });
    });
  })(req, res, next);
};

const logoutController = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Could not log out, please try again.' });
    }

    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Could not clear session, please try again.' });
      }

      res.status(200).json({ message: 'Logged out successfully' });
    });
  });
};

const getCurrentUser = (req, res) => {
  res.send(req.user);
};

const getAllExercises = async (req, res) => {
  try {
    const userId = req.user._id; // Getting the user id from the session
    const exercises = await Exercise.find({ userId }); // Finding exercises related to the user
    res.send(exercises);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const getOneExercise = async (req, res) => {
  try {
    //  By incorporating userId in the query, you verify that the requested exercise belongs to the authenticated user, thus preventing unauthorized access or modification. Without this check, authenticated users could potentially manipulate req.params.id to access other users' data. This double-check not only enforces data isolation between users but also adheres to security best practices, guarding against potential vulnerabilities in user-specific data handling.
    const userId = req.user._id; // Getting the user id from the session
    const exercise = await Exercise.findOne({ _id: req.params.id, userId });
    if (!exercise) return res.status(404).send('Exercise not found');
    res.send(exercise);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const createNewExercise = async (req, res) => {
  try {
    const newExercise = new Exercise({
      ...req.body,
      userId: req.user._id,
    });
    const savedExercise = await newExercise.save();
    res.send(savedExercise);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const editExercise = async (req, res) => {
  try {
    const userId = req.user._id; // Getting the user id from the session
    const updatedExercise = await Exercise.findOneAndUpdate(
      { _id: req.params.id, userId },
      {
        ...req.body,
        lastDateEdited: Date.now(),
      },
      { new: true },
    );
    if (!updatedExercise) return res.status(404).send('Exercise not found');
    res.send(updatedExercise);
  } catch (error) {
    console.error(error);
    res.status(422).send('Error updating exercise');
  }
};

const deleteExercise = async (req, res) => {
  try {
    const userId = req.user._id; // Getting the user id from the session
    const deletedExercise = await Exercise.findOneAndDelete({ _id: req.params.id, userId });
    if (!deletedExercise) return res.status(404).send('Exercise not found');
    res.status(200).send('Exercise Deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getAllExercises,
  getOneExercise,
  createNewExercise,
  deleteExercise,
  editExercise,
  createNewUser,
  login: loginController,
  logout: logoutController,
  getCurrentUser,
};
