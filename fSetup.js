const passport = require('passport');
const express = require('express');
const session = require('express-session');
//const User = require('./models/User');
const UserF = require('./models/UserF');
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(
    new FacebookStrategy({
        clientID: "519275640741864",
        clientSecret: "d80771aa942b4732e63d5ee3096ffae4",
        callbackURL: "/auth/facebook/redirect"
    },
    async (accessToken, refreshToken, profile, done) => {
        //console.log(profile);
        const currentUser = await UserF.findOne({ facebookid: profile.id});
        if(currentUser){
            done(null, currentUser);
            console.log('User already exist in database: ', currentUser);
        } else {
            const newUser = await UserF.create({
                username: profile.displayName, 
                facebookid: profile.id
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
  const user = await UserF.findById(id); 
  done(null, user);
});
*/