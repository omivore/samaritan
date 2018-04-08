const stitch = require("mongodb-stitch");
const geocode = require("./geocode");

const clientPromise = stitch.StitchClientFactory.create('samaritan-vvwrm');

let requestsDb;

module.exports = {
    loadMongo: () => {
        return clientPromise.then(client => {
            requestsDb = client.service('mongodb', 'mongodb-atlas')
                .db('samaritan-db')
                .collection('requests');
            return client.login();
        });
    },

    createRequest: (title, author, content, needed, time, address) => {
        return requestsDb.insertOne({
            title: title,
            author: author,
            time: time,
            address: address,
            location: {
                type: 'Point',
                coordinates: place
            },
            content: content,
            needed: needed,
            volunteers: [],
            uuid: uuid()
        });
    },

    getRequests: (location, locationString = location) => {
        return requestsDb.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: location.coordinates
                    },
                    $maxDistance: location.maxDistance,
                    $minDistance: location.minDistance
                }
            }
        }).execute().then(data => {
            return {
                search: locationString,
                requests: data.map(item => {
                    return {
                        id: item._id,
                        title: item.title,
                        author: item.author,
                        time: new Date(item.time).toDateString(),
                        distance: round(getDistance(
                            location.coordinates,
                            item.location.coordinates
                        ), 2).toString() + " miles away",
                        content: item.content,
                        current: 0,
                        total: item.needed
                    };
                })
            };
        }).catch(err => console.log(err));
    },

    updateRequest: (uuid, data) => {
        return requestsDb.updateOne({uuid: uuid}, {$set: {data}})
    },

    increaseCurrent: (uuid) => {
        return requestsDb.updateOne({uuid: uuid}, {$inc: {current: 1}})
    },

    requestsDb: () => requestsDb

};

function getDistance(coord1, coord2) {
    let lat1 = coord1[0];
    let lon1 = coord1[1];
    let lat2 = coord2[0];
    let lon2 = coord2[1];
    let phi1 = lat1.toRadians(), phi2 = lat2.toRadians(), deltaLambda = (lon2 - lon1).toRadians(), R = 6371e3; // gives d in metres
    let meterDistance = Math.acos(Math.sin(phi1) * Math.sin(phi2) + Math.cos(phi1) * Math.cos(phi2) * Math.cos(deltaLambda)) * R;
    return meterDistance * 0.000621371;
}

Number.prototype.toRadians = function () {
    return this * Math.PI / 180;
};

function round(number, precision) {
    var shift = function (number, precision, reverseShift) {
        if (reverseShift) {
            precision = -precision;
        }
        numArray = ("" + number).split("e");
        return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
    };
    return shift(Math.round(shift(number, precision, false)), precision, true);
}

function uuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
