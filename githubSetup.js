const passport = require('passport');
const express = require('express');
const session = require('express-session');
//const User = require('./models/User');
const UserG = require('./models/UserG');
const GithubStrategy = require('passport-github2').Strategy;

passport.use(
    new GithubStrategy({
        clientID: "Ov23liZlgbYn4gjdFLBU",
        clientSecret: "d4124f28749b0a381e2bad5c2acaf51d925bc012",
        callbackURL: "/auth/github/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
        //console.log(profile);
        const currentUser = await UserG.findOne({ githubid: profile.id});
        if(currentUser){
            done(null, currentUser);
            console.log('User already exist in database: ', currentUser);
        } else {
            const newUser = await UserG.create({
                username: profile.displayName, 
                githubid: profile.id
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
  const user = await UserG.findById(id); 
  done(null, user);
});*/

