const Post = require('../models/progressModel');
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

    // if using sessions, remember to also clear the session
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

const getAllPosts = async (req, res) => {
  try {
    const userId = req.user._id; // Getting the user id from the session
    const posts = await Post.find({ userId }); // Finding posts related to the user
    res.send(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const getOnePost = async (req, res) => {
  try {
    const userId = req.user._id; // Getting the user id from the session
    const post = await Post.findOne({ _id: req.params.id, userId });
    if (!post) return res.status(404).send('Post not found');
    res.send(post);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const createNewPost = async (req, res) => {
  try {
    const newPost = new Post({
      ...req.body,
      userId: req.user._id, // assuming 'req.user' holds the logged-in user
    });
    const savedPost = await newPost.save();
    res.send(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const editPost = async (req, res) => {
  try {
    const userId = req.user._id; // Getting the user id from the session
    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.id, userId },
      {
        ...req.body,
        lastDateEdited: Date.now(),
      },
      { new: true },
    );
    if (!updatedPost) return res.status(404).send('Post not found');
    res.send(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(422).send('Error updating post');
  }
};

const deletePost = async (req, res) => {
  try {
    const userId = req.user._id; // Getting the user id from the session
    const deletedPost = await Post.findOneAndDelete({ _id: req.params.id, userId });
    if (!deletedPost) return res.status(404).send('Post not found');
    res.status(200).send('Post Deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getAllPosts,
  getOnePost,
  createNewPost,
  deletePost,
  editPost,
  createNewUser,
  login: loginController,
  logout: logoutController,
  getCurrentUser,
};
