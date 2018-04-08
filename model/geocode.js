const unirest = require('unirest');

module.exports = {

    geocode: (search, callback) => {
        return unirest.get("https://nominatim.openstreetmap.org/")
            .headers({
                'Accept': 'application/json',
                'User-Agent': 'samaritan-node-client'
            })
            .query('format=jsonv2')
            .query('q=' + search)
            .end(response => callback(response));
    },

    reverse: (coordinates, callback) => {
        return unirest.get("https://nominatim.openstreetmap.org/reverse")
            .headers({
                'Accept': 'application/json',
                'User-Agent': 'samaritan-node-client'
            })
            .query('format=jsonv2')
            .query({lat: coordinates[0]})
            .query({lon: coordinates[1]})
            .end(response => callback(response));
    }
};
