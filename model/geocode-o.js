const unirest = require('unirest');

module.exports = {

    getLatLonByPostCode: (postal_code, callback = function() {}) => {

    },

    getPostCodeByLatLon: (coordinates, callback = function() {}) => {
        unirest.get("https://nominatim.openstreetmap.org/reverse")
            .query('format=jsonv2')
            .query({lat: coordinates[0]})
            .query({lon: coordinates[1]})
            .headers({
                'Accept': 'application/json',
                'User-Agent': 'samaritan-node-client'
            })
            .end(function (res) {
                callback(res)
            });
    }

};