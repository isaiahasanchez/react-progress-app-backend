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

app.set('trust proxy', 1); // trust first proxy, important if your app is behind a proxy like nginx, which is often the case in hosted environments


app.use(express.json());

// Below are the origins that Cors will allow to work.
const allowedOrigins = [
  'https://progressexerciselog.netlify.app',
  'https://progress-exercise-and-rehab-log-app.onrender.com',
  'http://localhost:3000',
  'http://localhost:5500' // add this
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));


// Initializing Session
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }), // use connect-mongo as session store
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
  },
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
