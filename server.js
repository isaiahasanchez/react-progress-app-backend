const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const MongoStore = require("connect-mongo");

const progressRoutes = require("./routes/progressRoutes");

const session = require("express-session");
const passport = require("passport");
const passportConfig = require("./middleware/passport");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "https://progress-exercise-rehab-log.netlify.app",
    credentials: true,
  })
);

// Initializing Session
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }), // use connect-mongo as session store
    cookie: { secure: false, sameSite: "none" },
  })
);

// Initializing Passport
app.use(passport.initialize());
app.use(passport.session());

// Use your routes after initializing passport and session
app.use("/", progressRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.log(error.message));

// Start the server
const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Server started on port ${port}`));
