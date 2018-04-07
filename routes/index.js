var express = require('express')
var router = express.Router()
var database = require('../model/database')

/* GET home page. */
router.get('/', function (req, res, next) {
    let location = {
        coord: [38.992505, -76.947505],
        dist: {
            min: 0,
            max: 10000
        }
    }

    db.then(() => {
        database.getRequests(location).then(data => {
            res.render('index', data)
        })
    })
})

module.exports = router
