var express = require('express');
var router = express.Router();

let test = {
    search: 'College Park, MD',
    requests: [
        {
            title: 'Help',
            author: 'jason',
            time: '10pm',
            distance: '2mi away',
            content: 'help I got hit by a hurricane come help me wash my car',
            current: '2', total: '4'
        },
        {
            title: 'Dan the Man',
            author: 'dan',
            time: '1am',
            distance: 'Near you',
            content: 'Need mah insomnia cookies man',
            current: '0', total: '1'
        },
        {
            title: '2',
            author: 'maxwell',
            time: '12pm',
            distance: '5mi away',
            content: 'oohhhh who lives in a pineapple under the seaaaa',
            current: '1', total: '3'
        }
    ]
}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', test);
});

module.exports = router;
