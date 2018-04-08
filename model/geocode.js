const unirest = require('unirest');

module.exports = {

    geocode: search => {
        return new Promise((resolve, reject) => {
            unirest.get("https://nominatim.openstreetmap.org/")
                .headers({
                    'Accept': 'application/json',
                    'User-Agent': 'samaritan-node-client'
                })
                .query('format=jsonv2')
                .query('q=' + search)
                .end(response => {
                    if (response) resolve(response);
                    else reject(response);
                });
        });
    },

    reverse: coordinates => {
        return new Promise((resolve, reject) => {
            unirest.get("https://nominatim.openstreetmap.org/reverse")
                .headers({
                    'Accept': 'application/json',
                    'User-Agent': 'samaritan-node-client'
                })
                .query('format=jsonv2')
                .query({lat: coordinates[0]})
                .query({lon: coordinates[1]})
                .end(response => {
                    if (response) resolve(response);
                    else reject(response);
                });
        });
    }
};
