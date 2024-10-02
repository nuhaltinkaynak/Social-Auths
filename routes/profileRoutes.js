const router = require('express').Router();

function checkAuth(req, res, next){ //unautherizate prohibided 

    req.user ? next() : res.sendStatus(401);
};

router.get("/", checkAuth, (req, res) => {
    //res.render('profile.ejs', {user: req.user});
    res.render('profile.ejs', {user: req.user});
    //res.send(req.user);
});

module.exports = router;
