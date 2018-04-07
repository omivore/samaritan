const stitch = require("mongodb-stitch")
const requests = require("./request")

let appId = 'samaritan-ugbfv'

const clientPromise = stitch.StitchClientFactory.create(appId)

clientPromise.then(client => {
    const db = client.service('mongodb', 'mongodb-atlas').db('samaritan-db')

    let dan = new requests.Request("Dan", "Title", "Content")
    dan.location = {
        type: "Point",
        coordinates: [38.995562, -76.941466]
    }


    client.login().then(() =>
        db.collection("requests").find({
            "location": {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [
                            38.992505,
                            -76.947505
                        ]
                    },
                    $maxDistance: 5
                }
            }
        }).limit(100).execute()
    ).then(data => {
        console.log(data)
        // console.log(data[0].location)
    }).catch(err =>
        console.log(err)
    )

})