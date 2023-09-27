const express = require('express');
const passport = require('passport')
const progressController = require('../controllers/progressController');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/authMiddleware');


router
    .route('/posts')
    .get(ensureAuthenticated, progressController.getAllPosts)
    .post(ensureAuthenticated, progressController.createNewPost); // Updated for consistency

router
    .route('/posts/:id')
    .get(ensureAuthenticated, progressController.getOnePost)
    .delete(ensureAuthenticated, progressController.deletePost)
    .put(ensureAuthenticated, progressController.editPost); // Updated for consistency

router 
    .route('/register')
    .post(progressController.createNewUser)


router
    .route('/login')
    .post(passport.authenticate('local'), progressController.login)
module.exports = router;
