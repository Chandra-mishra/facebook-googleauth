const passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');
const {facebookConstants} = require('../utils/utils')
passport.use(new FacebookStrategy({
    clientID:facebookConstants.FACEBOOK_CLIENT_ID,
    clientSecret:facebookConstants.FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({userid: profile.id}, {name: profile.displayName,userid: profile.id}, function(err, user) {
      if (err) { console.log(err); return done(err); }
      done(null, user);
    });
  }
));

module.exports = passport;
