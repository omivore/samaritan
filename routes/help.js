var express = require('express');
var router = express.Router();

/*router.get('/', function(req, res, next) {
    res.render('login');
});*/

router.post('/', (req, res) => {
    console.log("Hello World");
    console.log(req.uuid);
/*    req.session.regenerate(() => {
        req.session.user = req.body.username;
        res.redirect('back');
    });*/
    // res.redirect('back');
});

module.exports = router;

