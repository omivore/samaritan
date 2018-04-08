const database = require("../database");

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


database.loadMongo().then(() =>
    database.createRequest("Relief distribution", "Andy W", "Need some help distributing resources in the Carolina area", 10, Date.now(), "Carolina, Puerto Rico")
).then(data =>
    console.log(data)
).catch(err =>
    console.log(err)
);