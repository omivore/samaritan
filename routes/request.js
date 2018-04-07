var express = require('express');
var router = express.Router();

function restrict(req, res, next) {
    if (req.session.user) next();
    else res.redirect('/login');
}

router.get('/', restrict, function(req, res, next) {
  res.render('request.pug');
});

router.post('/', (req, res) => {
  res.render('request.pug');
});

module.exports = router;

