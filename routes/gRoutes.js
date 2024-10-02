const router = require("express").Router();
const passport = require('passport');

router.get("/login", (req, res) => {
    res.render("login.ejs");
});
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/github', passport.authenticate('github', { scope: ["profile"]}));
  
router.get('/github/callback', 
    passport.authenticate("github", { failureRedirect: '/login' }), (req, res) => {
        res.redirect("/profile");
    }
);



module.exports = router;