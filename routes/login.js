var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/', (req, res) => {
    req.session.regenerate(() => {
        req.session.user = req.body.username;
        res.redirect('/');
    });
});

module.exports = router;

