const express = require('express');
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

module.exports = router;
