const stitch = require("mongodb-stitch")
const requests = require("./request")

let appId = 'samaritan-vvwrm'

const clientPromise = stitch.StitchClientFactory.create(appId)

clientPromise.then(client => {
    const db = client.service('mongodb', 'mongodb-atlas').db('samaritan-db')
    let jason = new requests.Request("Jason", "Title", "Content")
    jason.lat = 38.995562
    jason.lon = -76.941466

    client.login().then(() =>
        jason.submit(db.collection("requests"))
    ).then(result =>
        console.log(result)
    ).catch(err => console.log(err))
})