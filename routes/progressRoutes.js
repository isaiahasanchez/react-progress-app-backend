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

router
  .route("/api/login")
  .post(passport.authenticate("local"), progressController.login);

router.post("/api/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Could not log out, please try again." });
    }
    
    // if using sessions, remember to also clear the session
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Could not clear session, please try again." });
      }
      
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
});

router.get('/api/current-user', ensureAuthenticated, progressController.getCurrentUser);

module.exports = router;
