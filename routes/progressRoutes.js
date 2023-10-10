const express = require("express");
const passport = require("passport");
const progressController = require("../controllers/progressController");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/authMiddleware");

router.route("/posts")
  .get(ensureAuthenticated, (req, res, next) => {
    console.log('Fetching all posts');
    progressController.getAllPosts(req, res, next);
  })
  .post(ensureAuthenticated, (req, res, next) => {
    console.log('Creating a new post with data:', req.body);
    progressController.createNewPost(req, res, next);
  });

router.route("/posts/:id")
  .get(ensureAuthenticated, (req, res, next) => {
    console.log(`Fetching post with ID: ${req.params.id}`);
    progressController.getOnePost(req, res, next);
  })
  .delete(ensureAuthenticated, (req, res, next) => {
    console.log(`Deleting post with ID: ${req.params.id}`);
    progressController.deletePost(req, res, next);
  })
  .put(ensureAuthenticated, (req, res, next) => {
    console.log(`Editing post with ID: ${req.params.id} with data:`, req.body);
    progressController.editPost(req, res, next);
  });

router.route("/register")
  .post((req, res, next) => {
    console.log('User registration attempt with data:', req.body);
    progressController.createNewUser(req, res, next);
  });

router.route("/login")
  .post((req, res, next) => {
    console.log('User login attempt with data:', req.body);
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            console.error('Passport authenticate error:', err);
            return next(err);
        }
        if (!user) {
            console.log('Login failed:', info);
        } else {
            console.log('User authenticated:', user);
        }
        progressController.login(req, res, next);
    })(req, res, next);
  });

router.post("/logout", (req, res) => {
    console.log('User logout attempt');
    // ... [rest of your logout logic]
});

router.get('/current-user', ensureAuthenticated, (req, res, next) => {
    console.log('Fetching current user');
    progressController.getCurrentUser(req, res, next);
});

  
module.exports = router;
