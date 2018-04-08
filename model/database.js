const stitch = require("mongodb-stitch")

const clientPromise = stitch.StitchClientFactory.create('samaritan-vvwrm')

let requestsDb

module.exports = {
    loadMongo: () => {
        return clientPromise.then(client => {
            requestsDb = client.service('mongodb', 'mongodb-atlas')
                               .db('samaritan-db')
                               .collection('requests')
            return client.login()
        })
    },

    createRequest: (title, author, content, needed, time, place) => {
        return requestsDb.insertOne({
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
        return requestsDb.find({}).execute().then(data => {
            return {
                search: location,
                requests: data.map(item => {
                    return {
                        id: item._id,
                        title: item.title,
                        author: item.author,
                        time: new Date(item.time).toDateString(),
                        distance: 'Not implemented',
                        content: item.content,
                        current: 0,
                        total: item.needed
                    }
                })
            }
        }).catch(err => console.log(err))
    },

    requestsDb: () => requestsDb
}
