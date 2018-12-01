const keys = require('../config/keys');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done)=>{
  done(null, user.id);
});

passport.deserializeUser((id, done)=>{
  User.findById(id).then(user => {
    done(null, user);
  })
});

passport.use(new LocalStrategy(
    (username, password, done)=>{
      User.findOne({userName: username, password: password}).then(user=>{
        if(user){
          return done(null, user);
        }else{
          return done(null, false);
        }
      })
    }
  )
);


passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
},
  (accessToken,refreshToken,profile,done)=>{
    //  console.log(profile.name.givenName);
      User.findOne({ googleid: profile.id})
        .then((existingUser)=>{
          if(existingUser){
            //we already have this user
          //    console.log(existingUser);
            done(null, existingUser);
          }else{
            //get a new one to the database
        //    console.log(existingUser);
            new User({
              googleid: profile.id,
              userName: null,
              password: null,
              name: profile.name.givenName
            }).save().then(user => done(null, user));
          }
        })
  }
));
