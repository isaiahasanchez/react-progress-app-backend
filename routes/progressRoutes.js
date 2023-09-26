const express = require('express');
const passport = require('passport')
const progressController = require('../controllers/progressController');
const router = express.Router();

router
    .route('/posts')
    .get(progressController.getAllPosts)
    .post(progressController.createNewPost); // Updated for consistency

router
    .route('/posts/:id')
    .get(progressController.getOnePost)
    .delete(progressController.deletePost)
    .put(progressController.editPost); // Updated for consistency

router 
    .route('/register')
    .post(progressController.createNewUser)


router
    .route('/login')
    .post(passport.authenticate('local'), progressController.login)
module.exports = router;
