const passport = require('passport');
const User = require('./models/User');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.use(
    new GoogleStrategy({
    clientID: "911668381846-9o3vghd5e7t4r7savmvetjlohsa3olpd.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "/auth/google/redirect"
    },
    async (accessToken, refreshToken, profile, done) => {
        //console.log(profile);
        const currentUser = await User.findOne({ googleid: profile.id});
        if(currentUser){
          done(null, currentUser);
          console.log('User already exist in database: ', currentUser);
        } else {
            const newUser = await User.create({
                username: profile.displayName, 
                googleid: profile.id
            });
            done(null, newUser);
            console.log('New user created:', newUser);
          }
    }   
));
/*
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id); 
  done(null, user);
});


*/