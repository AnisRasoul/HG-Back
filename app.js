const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/Auth'); // Import auth routes
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes')
const passport = require('./util/passport'); // Requiring the configured passport
const session = require('express-session');
require('dotenv').config(); // Ensure to load environment variables from .env file

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET, // session secret
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const mongoDBUri = process.env.MONGODB_URI;
mongoose.connect(mongoDBUri)
  .then(() => {
    console.log('Successfully connected');
  })
  .catch((error) => {
    console.error('Error connecting', error);
  });

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })
);

// Call back route
app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/', // Redirect to home or login page on failure
  }),
  (req, res) => {
    if (!req.user) {
      res.status(400).json({ error: 'Authentication failed' });
    }
    // Return user details
    res.status(200).json(req.user);
  }
);

app.use(authRoutes);
app.use(productRoutes);
app.use(orderRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on: ${PORT}`);
});
