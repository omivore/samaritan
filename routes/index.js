const express = require('express');
const geoip = require('geoip-lite');        // Soon to be deprecated
const database = require('../model/database');
const geocode = require('../model/geocode');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    let coordinates, address;
    if (req.query.address) {
        coordinates = geocode.geocode(req.query.address, response =>
            [Number(response.body[0].lat), Number(response.body[0].lon)]
        );
        address = address;
    } else {
        let geo = geoip.lookup(req.ip);
        if (geoip.lookup(req.ip) != null) {
            coordinates = Promise.resolve(geo.ll);
            address = "Near you";
        } else {
            // Hardcoded UMD campus as the default location
            coordinates = Promise.resolve([38.99203005, -76.9461029019905]);
            address = "University of Maryland, College Park";
        }
    }

    db.then(() => {
        coordinates.then(coords => {
            database.getRequests({
                coordinates: coords,
                maxDistance: 160000,      // TODO: make this dynamic
                minDistance: 0
            }, address).then(data => {
                res.render('index', data);
            })
        });
    });
});

module.exports = router;
