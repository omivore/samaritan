var express = require('express');
var router = express.Router();
const database = require('../model/database');

function restrict(req, res, next) {
    if (req.session.user) next();
    else res.redirect('/login');
}

router.get('/', restrict, function (req, res, next) {
    res.render('request.pug');
});

router.post('/', (req, res) => {
    // console.log("Posted");
    database.loadMongo().then(() => database.createRequest(
        req.body.title,
        req.session.user,
        req.body.content,
        req.body.needed,
        Date.now(),
        req.body.address
    ));
    res.redirect('/');
});

module.exports = router;

