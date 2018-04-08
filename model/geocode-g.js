const unirest = require('unirest');

module.exports = {

    geocode: postal_code => {

    },

    reverse: coordinates => {
        return unirest.get("https://maps.googleapis.com/maps/api/geocode/json")
            .query({latlng: coordinates[0] + ',' + coordinates[1]})
            .query({key: "AIzaSyCHugZquUQL1xw37zJQmckv2gptL6Anp2c"})
            .query({result_type: "postal_code"})
            .end(response => response.body);
    }
};
