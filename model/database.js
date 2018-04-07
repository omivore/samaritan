// database.js

const stitch = require("mongodb-stitch")

const clientPromise = stitch.StitchClientFactory.create('samaritan-vvwrm')

let db;

module.exports = {
    loadMongo: () => {
        clientPromise.then(client => {
            db = client.service('mongodb', 'mongodb-atlas').db('samaritan-db')
            client.login()
        })
    },

    createRequest: (title, author, content, needed, time, place) => {
        return db.collection('requests').insertOne({
            title: title,
            author: author,
            time: time,
            location: null,
            lat: place[0], lon: place[1],
            content: content,
            needed: needed,
            volunteers: []
        })
    },

    getRequests: (location) => {

    },

    db: () => db
}
