const stitch = require("mongodb-stitch")

const clientPromise = stitch.StitchClientFactory.create('samaritan-vvwrm')

let db
let requestsDb

module.exports = {

    loadMongo: () => {
        return clientPromise.then(client => {
            db = client.service('mongodb', 'mongodb-atlas').db('samaritan-db')
            requestsDb = db.collection('requests')
            return client.login()
        })
    },

    createRequest: (title, author, content, needed, time, place) => {
        return db.collection('requests').insertOne({
            title: title,
            author: author,
            time: time,
            location: {
                type: 'Point',
                coordinates: place
            },
            content: content,
            needed: needed,
            volunteers: []
        })
    },

    getRequests: (location) => {
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
                search: location,
                requests: data.map(item => {
                    return {
                        title: item.title,
                        author: item.author,
                        time: item.time.toString(),
                        distance: getDistance(location.coordinates, item.location.coordinates),
                        content: item.content,
                        current: 0,
                        total: item.needed
                    }
                })
            }
        }).catch(err => console.log(err))
    },

    db: () => db
}

function getDistance(coord1, coord2) {
    var lat1 = coord1[0]
    var lon1 = coord1[1]
    var lat2 = coord2[0]
    var lon2 = coord2[1]
    var phi1 = lat1.toRadians(), phi2 = lat2.toRadians(), deltaLambda = (lon2-lon1).toRadians(), R = 6371e3; // gives d in metres
    return Math.acos( Math.sin(phi1)*Math.sin(phi2) + Math.cos(phi1)*Math.cos(phi2) * Math.cos(deltaLambda) ) * R;
}