const router = require('express').Router();
const bcrypt = require('bcrypt');
const keys = require('./../config/keys');
const user = require('../models/user-model')
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

//auth logout 
router.post('/signup', (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, salt);
    console.log(req.body);
    console.log(hash);

    // check user already exists
    user.findOne({ 'userName': req.body.userName }).then((currentUser) => {
        if (currentUser) {
            //console.log("current user is :" + currentUser);
            message = [{ "msg": currentUser.userName + "\t already exist" }];
            console.log(message);
            res.send(JSON.stringify({ message: message }));
        } else {



            new user({

                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userName: req.body.userName,
                userRole: req.body.userRole,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone,
                covidTest: req.body.covidTest,
                location: req.body.location,
                score: req.body.score
            }).save().then((newUser) => {
                console.log("new user created :" + newUser);
                res.send(JSON.stringify(newUser));

            });
        }
    })

});

router.put('/update', (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, salt);
    console.log('req.body',req.body);
    // console.log(hash);

    // check user already exists
    user.findOne({ 'userName': req.body.userName }).then((currentUser) => {
        if (!currentUser) {

            message = [{ "msg": "User doesn't exist" }];
            console.log(message);
            res.send(JSON.stringify({ message: message }));
        } else {




            user.updateOne({ 'userName': req.body.userName }, {

                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userName: req.body.userName,
                userRole: req.body.userRole,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone,
                covidTest: req.body.covidTest,
                location: req.body.location,
                score: req.body.score

            }, {}).then((newUser) => {
                user.findOne({ 'userName': req.body.userName }, function(err, result) {
                    if (err) throw err;
                    res.send(JSON.stringify(result));
                });

            });



        }
    })

});

// get top patients
router.get('/getPatients', (req, res) => {
    var mysort = { score: -1 };
    user.find({ 'userRole': "patient" }).sort(mysort).limit(5).then((result) => {
        res.send(JSON.stringify(result));
    });
});

// get top patients
router.get('/getUserInfoById', (req, res) => {
    const id = req.params.id;
    user.findOne({ 'id': id }).then((result) => {
        if (!result) {

            message = [{ "msg": "User doesn't exist" }];
            console.log(message);
            res.send(JSON.stringify({ message: message }));
        } else {
            res.send(JSON.stringify(result));
        }
    });
});

module.exports = router;