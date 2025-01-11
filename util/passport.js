const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User"); // Import User model

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // google client id
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // google client secret
      // the callback url added while creating the Google auth app on the console
      callbackURL: "http://localhost:3000/oauth",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOrCreate(profile);
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
// function to serialize a user/profile object into the session
passport.serializeUser(function (user, done) {
  done(null, user);
});

// function to deserialize a user/profile object into the session
passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = passport;
