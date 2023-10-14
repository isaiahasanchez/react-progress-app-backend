const express = require("express");
const passport = require("passport");
const progressController = require("../controllers/progressController");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/authMiddleware");

router
  .route("/api/posts")
  .get(ensureAuthenticated, progressController.getAllPosts)
  .post(ensureAuthenticated, progressController.createNewPost); 

router
  .route("/api/posts/:id")
  .get(ensureAuthenticated, progressController.getOnePost)
  .delete(ensureAuthenticated, progressController.deletePost)
  .put(ensureAuthenticated, progressController.editPost); 

router.route("/api/register").post(progressController.createNewUser);

router.route("/api/login").post(progressController.login);

router.post("/api/logout", progressController.logout);


router.get('/api/current-user', ensureAuthenticated, progressController.getCurrentUser);

module.exports = router;
