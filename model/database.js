// database.js

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
        // requestsDb.find({}).execute().then(data => console.log(data))

        return requestsDb.find({}).execute().then(data => {
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
    }
    /*

            return {
                search: location,
                requests: formattedResults
            }
            return {
                search: location, // not used for anything?
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
            }*/
    ,

    db: () => db
}
