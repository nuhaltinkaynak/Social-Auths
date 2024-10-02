const passport = require('passport');
const UserT = require('./models/UserT');
const session = require('express-session');
const TwitterStrategy = require('passport-twitter').Strategy;


passport.use(new TwitterStrategy({
    consumerKey: 'lriTI56F0IfeIx2AP8Tsk7l6I',
    consumerSecret: '9c0Ed0Rl4rZJLhMbsjos34WIHCtBeA6TN9yDD9fEYGqQtBgrBm',
    callbackURL: "auth/twitter/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    //console.log(profile);
    const currentUser = await UserT.findOne({ twitterid: profile.id});
    if(currentUser){
      done(null, currentUser);
      console.log('User already exist in database: ', currentUser);
    } else {
        const newUser = await UserT.create({
            username: profile.displayName, 
            twitterid: profile.id
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