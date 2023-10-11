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

// Add a middleware for request logging:
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  console.log('Headers:', JSON.stringify(req.headers));
  next();
});

// Below are the origins that Cors will allow to work.
const allowedOrigins = [
  'https://progressexerciselog.netlify.app',
  'https://progress-exercise-and-rehab-log-app.onrender.com',
  'http://localhost:3000',
  'http://localhost:5500',
  'https://react-progress-app-frontend.vercel.app',
  'https://react-progress-app-frontend-jqp7x766s-isaiah-sanchezs-projects.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS policy switch it up'));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));


if (process.env.NODE_ENV === 'development') {
  console.log('Running in development mode!');
} else if (process.env.NODE_ENV === 'production') {
  console.log('Running in production mode!');
}


// Initializing Session
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }), // use connect-mongo as session store
    cookie: {
      secure: 'false', // this makes it so if you set the env in my file to development then this state evaluate to false which would make secure false run which is good on development but when env is set to production it matches which evaluates to true which doesnt all cross
      sameSite: 'none',
  },
  })
);

// Initializing Passport
app.use(passport.initialize());
app.use(passport.session());

// Use your routes after initializing passport and session
app.use("/", progressRoutes);

app.use((req, res, next) => {
    console.log('Session data:', req.session);
    next();
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.log(error.message));

// Start the server
const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Server started on port ${port}`));
