const express = require('express');
const passport = require('passport');
const progressController = require('../controllers/progressController');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/authMiddleware');

router
  .route('/api/exercises')
  .get(ensureAuthenticated, progressController.getAllExercises)
  .post(ensureAuthenticated, progressController.createNewExercise);

router
  .route('/api/exercises/:id')
  .get(ensureAuthenticated, progressController.getOneExercise)
  .delete(ensureAuthenticated, progressController.deleteExercise)
  .put(ensureAuthenticated, progressController.editExercise);

router.route('/api/register').post(progressController.createNewUser);

router.route('/api/login').post(progressController.login);

router.post('/api/logout', progressController.logout);

router.get('/api/current-user', ensureAuthenticated, progressController.getCurrentUser);

module.exports = router;
