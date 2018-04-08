const express = require('express');
// const unirest = require('unirest');
const router = express.Router();
const database = require('../model/database');
const geocode = require('../model/geocode-g');
// const geocode = require('../model/geocode-c');

/* GET home page. */
router.get('/', function (req, res, next) {

    let location = {
        coordinates: [38.992505, -76.947505],
        maxDistance: 10000,
        minDistance: 0
    };

    geocode.getPostCodeByLatLon(location.coordinates, function(response) {
        let locationString = "";
        if (response !== undefined && response.status === 200 && response.body.status === "OK") {
            locationString = "Requests near " + response.body.results[0].address_components[0].short_name;
        } else {
            locationString = "Requests";
        }
        db.then(() =>
            database.getRequests(location, locationString).then(data =>
                res.render('index', data)
            )
        );

    });

});

module.exports = router;
