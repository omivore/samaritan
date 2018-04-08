const express = require('express');
const database = require('../model/database');
const geocode = require('../model/geocode');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.query.address) {
        geocode.geocode(req.query.address, response => {
            let location = {
                coordinates: [
                    Number(response.body[0].lat),
                    Number(response.body[0].lon)
                ],
                maxDistance: 160000,      // TODO: make this dynamic
                minDistance: 0
            };
            db.then(() => {
                database.getRequests(location, req.query.address).then(data => {
                    res.render('index', data);
                })
            });
        });
    } else {
        // Default location?
        res.render('index');
    }
});

module.exports = router;
