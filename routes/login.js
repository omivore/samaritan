var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/', (req, res) => {
    console.log("getting the thing!");
    req.session.regenerate(() => {
        req.session.user = req.body.username;
        res.redirect('back');
    });
});

module.exports = router;

