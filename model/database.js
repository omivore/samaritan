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
            coordinates: {
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
                        distance: 'Not implemented',
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
