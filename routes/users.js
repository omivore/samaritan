var express = require('express');
var router = express.Router();

function restrict(req, res, next) {
    if (req.session.user) next();
    else res.redirect('/login');
}

/* GET users listing. */
router.get('/', restrict, function(req, res, next) {
  res.render('users.pug', { username: req.session.user });
});

router.post('/', (req, res) => {
    req.session.destroy(() => res.redirect('/'));
});

module.exports = router;
