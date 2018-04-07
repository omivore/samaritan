const stitch = require("mongodb-stitch")
const requests = require("./request")

let appId = 'samaritan-vvwrm'

const clientPromise = stitch.StitchClientFactory.create(appId)

clientPromise.then(client => {
    const db = client.service('mongodb', 'mongodb-atlas').db('samaritan-db')

    client.login().then(() =>
        db.collection("requests").find().limit(100).execute()
    ).then(data => {
        console.log(data)
        // console.log(data[0].location)
    }).catch(err =>
        console.log(err)
    )

})