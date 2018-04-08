const unirest = require('unirest');

module.exports = {

    getLatLonByPostCode: (postal_code, callback = function() {}) => {

    },

    getPostCodeByLatLon: (coordinates, callback = function() {}) => {
        unirest.get("https://maps.googleapis.com/maps/api/geocode/json")
            .query({latlng: coordinates[0] + ',' + coordinates[1]})
            .query({key: "AIzaSyCHugZquUQL1xw37zJQmckv2gptL6Anp2c"})
            .query({result_type: "postal_code"})
            .end(function(res) {
                callback(res)
            });
    }

};