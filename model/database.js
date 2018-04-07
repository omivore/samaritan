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
        return {
            search: location,
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
    },

    db: () => db
}
