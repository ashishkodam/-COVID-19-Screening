const router = require('express').Router();

const authCheck = (req, res, next) => {

    if (!req.user) {
        // user is not logged in
        console.log("emo");
        res.redirect('/auth/login');
    } else {
        //user logged in
        next();

    }
};

router.get("/", authCheck, (req, res) => {
    //  res.send('you are logged in this profile-' + req.user.username);

    res.send(JSON.stringify(req.user));
});

module.exports = router;