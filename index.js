const express = require("express");
const goRoutes = require("./routes/goRoutes"); 
const gRoutes = require("./routes/gRoutes"); 
const fRoutes = require("./routes/fRoutes"); 
const tRoutes = require("./routes/tRoutes"); 
const profileRoutes = require("./routes/profileRoutes"); 
const mongoose = require('mongoose');
const session = require('express-session'); 
const cookieSession = require("cookie-session");
const passport = require("passport");

require("./goSetup");
require("./fSetup");
require("./githubSetup");
require("./tSetup");

mongoose.set('strictQuery', false);

mongoose
.connect('mongodb://localhost:27017/0AtuhTest')
.then(() => console.log('connected'))
.catch(() => console.log('not connected'));

const app = express();

app.set("view-engine", "ejs"); // ejs set as engine

app.use(
    cookieSession({
        keys: ["123"],
    }
)); 


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
    cb(null, user);
  });
passport.deserializeUser(function (obj, cb) {
    cb(null, obj);  
});

app.use("/auth", fRoutes);
app.use("/auth", goRoutes);
app.use("/auth", gRoutes);
app.use("/auth", tRoutes);
app.use("/profile", profileRoutes);



app.get("/", (req, res) => { //home page route
    res.render("home.ejs");
});



app.listen(3000, console.log("port on 3000")); 
