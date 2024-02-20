const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const MongoStore = require('connect-mongo');

const progressRoutes = require('./routes/progressRoutes');

const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./middleware/passport');

const app = express();

app.set('trust proxy', 1);

app.use(express.json());

// Below are the origins that Cors will allow to work.
const allowedOrigins = [
  'https://progressexerciselog.netlify.app',
  'http://localhost:3000',
  'http://localhost:5500/exercises',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS policy switch it up'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
);

if (process.env.NODE_ENV === 'development') {
  console.log('Running in development mode!');
} else if (process.env.NODE_ENV === 'production') {
  console.log('Running in production mode!');
}

if (process.env.NODE_ENV === 'production') {
  sameSiteSetting = 'none';
  secureSetting = true;
} else {
  sameSiteSetting = 'lax';
  secureSetting = false;
}

// Initializing Session
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      httpOnly: true,
      maxAge: 7200000,
      secure: secureSetting,
      sameSite: sameSiteSetting,
    },
  }),
);

// Initializing Passport
app.use(passport.initialize());
app.use(passport.session());

// Use routes after initializing passport and session
app.use('/', progressRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to DB'))
  .catch((error) => console.log(error.message));

// Start the server
const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Server started on port ${port}`));
