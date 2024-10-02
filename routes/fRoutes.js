const router = require("express").Router();
const passport = require('passport');

router.get("/login", (req, res) => {
    res.render("login.ejs");
});
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect('/');
});
/*
router.get("/facebook", passport.authenticate("facebook", { scope: "email"}));

router.get("/facebook/redirect", passport.authenticate("facebook"), (req, res) => {
    res.redirect("/profile");
});*/
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"]}));

router.get("/facebook/redirect", passport.authenticate("facebook"), (req, res) => {
    res.redirect("/profile");
});

module.exports = router;