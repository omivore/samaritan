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
    database.createRequest("Coding", "Dan", "food", 0, Date.now(), coordinates["xfinity-center"])
).then(data =>
    console.log(data)
).catch(err =>
    console.log(err)
);