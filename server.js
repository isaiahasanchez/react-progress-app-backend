const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // New Import
require('dotenv').config();

const progressRoutes = require('./routes/progressRoutes');

const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./middleware/passport');

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', // Update with your deployed frontend URL once deployed
    credentials: true,
}));

// Serve static files from the React app
app.use(express.static(path.resolve(__dirname, '../../react-progress-app-frontend/progress-app/build')));

// Initializing Session
app.use(session({ secret: process.env.SESSION_KEY, resave: false, saveUninitialized: false }));

// Initializing Passport
app.use(passport.initialize());
app.use(passport.session());

// Use your routes after initializing passport and session
app.use('/', progressRoutes); 

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../react-progress-app-frontend/progress-app/build', 'index.html'));
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to DB'))
    .catch(error => console.log(error.message));

// Start the server
app.listen(5500, () => console.log('Server started on port 5500'));
