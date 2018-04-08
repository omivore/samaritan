const stitch = require("mongodb-stitch");
const coordinates = {
    "xfinity-center": [
        38.995562,
        -76.941466
    ],
    "hagerstown": [
        38.992505,
        -76.947505
    ],

};

let appId = 'samaritan-vvwrm';

const clientPromise = stitch.StitchClientFactory.create(appId);

clientPromise.then(client => {
    const db = client.service('mongodb', 'mongodb-atlas').db('samaritan-db');

    client.login().then(() =>
        db.collection("requests").find({}).limit(100).execute()
    ).then(data => {
        console.log(data);
        // console.log(data[0].coordinates)
    }).catch(err =>
        console.log(err)
    );

});