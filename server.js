const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const progressRoutes = require('./routes/progressRoutes');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./middleware/passport');

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', // replace with your application's URL
    credentials: true,
}));

// Initializing Session
app.use(session({ secret: process.env.SESSION_KEY, resave: false, saveUninitialized: false }));

// Initializing Passport
app.use(passport.initialize());
app.use(passport.session());

// use your routes after initializing passport and session
app.use('/', progressRoutes);

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('connected to DB'))
    .catch(error => console.log(error.message));

// start the server
app.listen(5500, () => console.log('Server started on port 5500'));
