const express = require('express');
const progressController = require('../controllers/progressController');
const router = express.Router();


router
    .route('/')
    .get(progressController.getAllProgress)

router
    .route('/upload')
    .get(progressController.getUploadProgress)

router
    .route('/edit/:id')
    .get(progressController.getEditProgress)

router
    .route('/delete/:id')
    .post(progressController.getDeleteProgress)
    
    