const router = require("express").Router();
const passport = require('passport');

router.get("/login", (req, res) => {
    res.render("login.ejs");
});
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/twitter', passport.authenticate('twitter', { scope: ["profile"]}));
  
router.get('/twitter/callback', 
    passport.authenticate("twitter", { failureRedirect: '/login' }), (req, res) => {
        res.redirect("/profile");
    }
);



module.exports = router;