var express = require('express');
var router = express.Router();
const database = require('../model/database');

<<<<<<< HEAD
router.get('/', function(req, res, next) {
    res.redirect('back');
});

=======
>>>>>>> master
router.post('/', (req, res) => {
    const uuid = req.body.reqId;
    database.addVolunteer(uuid, req.session.user).then(data => console.log(data));
    res.redirect('back');
});

module.exports = router;

