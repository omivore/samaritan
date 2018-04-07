const stitch = require("mongodb-stitch")

module.exports = {

    Request: class {

        constructor(author, title, content) {
            this.author = author
            this.title = title
            this.content = content
            this.lat = 0
            this.lon = 0
            this.tags = []
            this.needed = 0
            this.fulfilled = 0
            this.ver = 0.2
        }

        submit(collection) {

            return collection.insertOne(this)



            // send data to mongo
        }

    }
}